import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  global: {
    theme: string;
    tone: string;
    audience: string;
  };
  hourly: {
    [key: string]: {
      theme: string;
      tone: string;
      audience: string;
    };
  };
}

interface HourlyParameters {
  theme: string;
  tone: string;
  audience: string;
  hour: number;
}

interface QuoteData {
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  hour: number;
}

// Load configuration
const configPath = path.join(__dirname, '../../config.json');
const config: Config = require(configPath);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Get parameters for the current hour
 */
export function getHourlyParameters(): HourlyParameters {
  const currentHour = new Date().getHours();
  const hourlyConfig = config.hourly[currentHour.toString()];
  
  return {
    theme: hourlyConfig?.theme || config.global.theme,
    tone: hourlyConfig?.tone || config.global.tone,
    audience: hourlyConfig?.audience || config.global.audience,
    hour: currentHour
  };
}

/**
 * Generate a quote using OpenAI
 */
export async function generateQuote(theme: string, tone: string, audience: string): Promise<string> {
  try {
    const prompt = `Generate an original, meaningful quote about "${theme}" with a ${tone} tone for ${audience}. 
    The quote should be inspirational, thought-provoking, and unique. 
    Return only the quote text without quotes marks or attribution.
    Keep it concise (under 200 characters).`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a wise philosopher and wordsmith who creates original, meaningful quotes.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.9
    });

    return response.choices[0].message.content?.trim() || '';
  } catch (error) {
    console.error('Error generating quote:', error);
    throw error;
  }
}

/**
 * Get current date string in YYYY-MM-DD format
 */
function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Save quote to all required files
 */
export async function saveQuote(quoteData: QuoteData): Promise<void> {
  const dataDir = path.join(__dirname, '../../data/quotes');
  
  // Ensure data directory exists
  await fs.mkdir(dataDir, { recursive: true });
  
  const dateStr = getDateString();
  const dayFilePath = path.join(dataDir, `${dateStr}.json`);
  const todayFilePath = path.join(dataDir, 'today.json');
  const latestFilePath = path.join(dataDir, 'latest.json');
  
  // Read existing day file or create new array
  let dayQuotes: QuoteData[] = [];
  try {
    const dayFileContent = await fs.readFile(dayFilePath, 'utf-8');
    dayQuotes = JSON.parse(dayFileContent);
  } catch (error) {
    // File doesn't exist, start with empty array
    dayQuotes = [];
  }
  
  // Add new quote to day's quotes
  dayQuotes.push(quoteData);
  
  // Save to day-wise file
  await fs.writeFile(dayFilePath, JSON.stringify(dayQuotes, null, 2));
  console.log(`Saved to day file: ${dayFilePath}`);
  
  // Save to today.json (all quotes for current day)
  await fs.writeFile(todayFilePath, JSON.stringify(dayQuotes, null, 2));
  console.log(`Updated today.json`);
  
  // Save to latest.json (single most recent quote)
  await fs.writeFile(latestFilePath, JSON.stringify(quoteData, null, 2));
  console.log(`Updated latest.json`);
}

/**
 * Main function to generate and save quote
 */
export async function main(): Promise<QuoteData> {
  try {
    console.log('Starting quote generation...');
    
    const params = getHourlyParameters();
    console.log(`Generating quote for hour ${params.hour}:`);
    console.log(`Theme: ${params.theme}, Tone: ${params.tone}, Audience: ${params.audience}`);
    
    const quote = await generateQuote(params.theme, params.tone, params.audience);
    console.log(`Generated quote: "${quote}"`);
    
    const quoteData: QuoteData = {
      quote: quote,
      theme: params.theme,
      tone: params.tone,
      audience: params.audience,
      timestamp: new Date().toISOString(),
      hour: params.hour
    };
    
    await saveQuote(quoteData);
    
    console.log('Quote generation completed successfully!');
    return quoteData;
  } catch (error) {
    console.error('Failed to generate quote:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
