const fs = require('fs');
const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type LatestQuote implements Node {
      id: ID!
      quote: String!
      theme: String!
      tone: String!
      audience: String!
      timestamp: String!
      hour: Int!
    }
    
    type TodayQuote implements Node {
      id: ID!
      quote: String!
      theme: String!
      tone: String!
      audience: String!
      timestamp: String!
      hour: Int!
    }
    
    type HistoryQuote implements Node {
      id: ID!
      quote: String!
      theme: String!
      tone: String!
      audience: String!
      timestamp: String!
      hour: Int!
      date: String!
    }
  `);
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  options
) => {
  const { createNode } = actions;

  // Create nodes from quote files
  const quotesDir = path.join(__dirname, 'data/quotes');

  // Read all JSON files from quotes directory
  const files = fs.readdirSync(quotesDir);
  const dateFiles = files.filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f));

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Process latest.json
  try {
    const latestData = JSON.parse(
      fs.readFileSync(path.join(quotesDir, 'latest.json'), 'utf-8')
    );
    createNode({
      id: createNodeId('latest-quote'),
      parent: null,
      children: [],
      internal: {
        type: 'LatestQuote',
        contentDigest: createContentDigest(latestData),
      },
      quote: latestData.quote,
      theme: latestData.theme,
      tone: latestData.tone,
      audience: latestData.audience,
      timestamp: latestData.timestamp,
      hour: latestData.hour,
    });
  } catch (e) {
    console.error('Error reading latest.json:', e);
  }

  // Process today.json
  try {
    const todayData = JSON.parse(
      fs.readFileSync(path.join(quotesDir, 'today.json'), 'utf-8')
    );
    if (Array.isArray(todayData)) {
      todayData.forEach((quote, idx) => {
        createNode({
          id: createNodeId(`today-quote-${idx}`),
          parent: null,
          children: [],
          internal: {
            type: 'TodayQuote',
            contentDigest: createContentDigest(quote),
          },
          quote: quote.quote,
          theme: quote.theme,
          tone: quote.tone,
          audience: quote.audience,
          timestamp: quote.timestamp,
          hour: quote.hour,
        });
      });
    }
  } catch (e) {
    console.error('Error reading today.json:', e);
  }

  // Process historical quotes (files with dates other than today)
  dateFiles.sort().reverse().forEach((file) => {
    const dateStr = file.replace('.json', '');
    
    // Skip today's file from historical quotes
    if (dateStr === today) {
      return;
    }

    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(quotesDir, file), 'utf-8')
      );

      if (Array.isArray(data)) {
        data.forEach((quote, idx) => {
          createNode({
            id: createNodeId(`history-quote-${dateStr}-${idx}`),
            parent: null,
            children: [],
            internal: {
              type: 'HistoryQuote',
              contentDigest: createContentDigest(quote),
            },
            date: dateStr,
            quote: quote.quote,
            theme: quote.theme,
            tone: quote.tone,
            audience: quote.audience,
            timestamp: quote.timestamp,
            hour: quote.hour,
          });
        });
      }
    } catch (e) {
      console.error(`Error reading ${file}:`, e);
    }
  });
};
