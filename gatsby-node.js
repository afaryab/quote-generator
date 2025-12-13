const fs = require('fs');
const path = require('path');

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
  } catch (e) {
    console.error('Error reading today.json:', e);
  }

  // Process historical quotes
  dateFiles.sort().reverse().forEach((file) => {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(quotesDir, file), 'utf-8')
      );
      const dateStr = file.replace('.json', '');

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
    } catch (e) {
      console.error(`Error reading ${file}:`, e);
    }
  });
};
