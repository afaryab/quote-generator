# Quote Generator

An automated hourly quote generator powered by OpenAI that creates original, meaningful quotes with configurable themes, tones, and audiences. Features a Node.js website to display the latest quotes and browse historical quotes.

## Features

- 🤖 **Automated Quote Generation**: GitHub Actions workflow runs hourly to generate new quotes
- 🎨 **Configurable Parameters**: Theme, tone, and audience customizable per hour and globally
- 💾 **Smart Data Storage**: 
  - Day-wise JSON files with 24 quotes per day
  - `today.json` for current day's quotes
  - `latest.json` for the most recent quote
- 🌐 **Web Interface**:
  - Home page displaying the latest quote
  - History page with today's quotes and date-wise accordion for historical quotes
- 📝 **TypeScript**: Fully typed codebase for better maintainability

## Prerequisites

- Node.js 18 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- GitHub account (for automated workflow)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/afaryab/quote-generator.git
cd quote-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

## Usage

### Development

Run the development server with hot reload:
```bash
npm run dev
```

### Production

1. Build TypeScript:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

### Manual Quote Generation

Generate a quote manually:
```bash
npm run generate
```

## Configuration

Edit `config.json` to customize quote generation parameters:

- **Global settings**: Default theme, tone, and audience
- **Hourly settings**: Specific parameters for each hour (0-23)

Example:
```json
{
  "global": {
    "theme": "inspiration",
    "tone": "uplifting",
    "audience": "general"
  },
  "hourly": {
    "0": { "theme": "new beginnings", "tone": "motivational", "audience": "early risers" },
    ...
  }
}
```

## GitHub Actions Setup

The workflow is configured in `.github/workflows/generate-quote.yml` to run hourly.

### Required Secret

Add your OpenAI API key as a GitHub secret:

1. Go to your repository Settings
2. Navigate to Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key

The workflow will:
- Run every hour at the top of the hour
- Generate a new quote based on the current hour's configuration
- Commit the changes automatically using your GitHub user credentials

## Project Structure

```
quote-generator/
├── .github/
│   └── workflows/
│       └── generate-quote.yml    # Hourly quote generation workflow
├── src/
│   ├── scripts/
│   │   └── generate-quote.ts     # Quote generation logic
│   └── server.ts                 # Express.js web server
├── views/
│   ├── index.ejs                 # Home page template
│   └── history.ejs               # History page template
├── public/
│   └── css/
│       └── styles.css            # Styling
├── data/
│   └── quotes/                   # Generated quotes storage
│       ├── latest.json           # Most recent quote
│       ├── today.json            # Today's quotes
│       └── YYYY-MM-DD.json       # Daily quote files
├── config.json                   # Quote generation configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## API Endpoints

- `GET /` - Home page with latest quote
- `GET /history` - History page with all quotes
- `GET /api/latest` - JSON of latest quote
- `GET /api/today` - JSON of today's quotes
- `GET /api/quotes/:date` - JSON of quotes for specific date (YYYY-MM-DD)

## License

ISC
