import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;

interface QuoteData {
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  hour: number;
}

interface DayQuotes {
  date: string;
  displayDate: string;
  quotes: QuoteData[];
}

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Read JSON file safely
 */
async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all quote files sorted by date (newest first)
 */
async function getAllQuoteFiles(): Promise<string[]> {
  const quotesDir = path.join(__dirname, '../data/quotes');
  try {
    const files = await fs.readdir(quotesDir);
    // Filter for date-formatted files (YYYY-MM-DD.json)
    const dateFiles = files.filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f));
    // Sort by date descending
    return dateFiles.sort().reverse();
  } catch (error) {
    console.error('Error reading quotes directory:', error);
    return [];
  }
}

/**
 * Home page - show latest quote
 */
app.get('/', async (req: Request, res: Response) => {
  const latestPath = path.join(__dirname, '../data/quotes/latest.json');
  const latest = await readJsonFile<QuoteData>(latestPath);
  
  res.render('index', { 
    latest: latest || { 
      quote: 'No quotes generated yet',
      theme: '',
      tone: '',
      audience: '',
      timestamp: new Date().toISOString(),
      hour: 0
    }
  });
});

/**
 * History page - show today's quotes and historical quotes
 */
app.get('/history', async (req: Request, res: Response) => {
  const todayPath = path.join(__dirname, '../data/quotes/today.json');
  const todayQuotes = await readJsonFile<QuoteData[]>(todayPath) || [];
  
  // Get all historical quote files
  const quoteFiles = await getAllQuoteFiles();
  const quotesDir = path.join(__dirname, '../data/quotes');
  
  // Load all historical quotes
  const history: DayQuotes[] = [];
  for (const file of quoteFiles) {
    const filePath = path.join(quotesDir, file);
    const quotes = await readJsonFile<QuoteData[]>(filePath);
    if (quotes && quotes.length > 0) {
      const date = file.replace('.json', '');
      history.push({
        date: date,
        displayDate: new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        quotes: quotes
      });
    }
  }
  
  res.render('history', { 
    todayQuotes: todayQuotes,
    history: history
  });
});

/**
 * API endpoint to get latest quote
 */
app.get('/api/latest', async (req: Request, res: Response) => {
  const latestPath = path.join(__dirname, '../data/quotes/latest.json');
  const latest = await readJsonFile<QuoteData>(latestPath);
  res.json(latest || {});
});

/**
 * API endpoint to get today's quotes
 */
app.get('/api/today', async (req: Request, res: Response) => {
  const todayPath = path.join(__dirname, '../data/quotes/today.json');
  const today = await readJsonFile<QuoteData[]>(todayPath);
  res.json(today || []);
});

/**
 * API endpoint to get quotes by date
 */
app.get('/api/quotes/:date', async (req: Request, res: Response) => {
  const date = req.params.date;
  const filePath = path.join(__dirname, '../data/quotes', `${date}.json`);
  const quotes = await readJsonFile<QuoteData[]>(filePath);
  res.json(quotes || []);
});

// Start server
app.listen(PORT, () => {
  console.log(`Quote Generator server running on http://localhost:${PORT}`);
});
