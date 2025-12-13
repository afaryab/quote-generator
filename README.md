# Quote Generator

An automated hourly quote generator powered by OpenAI that creates original, meaningful quotes with configurable themes, tones, and audiences. Built with Gatsby.js for a modern, fast static site with GraphQL data sourcing.

## Features

- 🤖 **Automated Hourly Generation**: GitHub Actions workflow generates new quotes every hour
- ⚛️ **Gatsby.js Static Site**: Modern static site generator with React and GraphQL
- 📊 **GraphQL Data Sourcing**: Efficient queries from JSON files in the `/data/quotes` directory
- 🎨 **Configurable Parameters**: Theme, tone, and audience customizable per hour and globally
- 💾 **Smart Data Storage**: 
  - Day-wise JSON files with hourly quotes
  - `today.json` for current day's quotes
  - `latest.json` for the most recent quote
- 🌐 **Beautiful Web Interface**:
  - Home page: Full-screen display of the latest quote with soft gradient background
  - History page: Today's quotes + date-wise collapsible accordion for historical quotes
  - Full-width blockquote list view with hover animations
- 📝 **100% TypeScript**: All components written in TSX with full type safety
- 🎨 **Tailwind CSS**: Modern, responsive design with Material Design aesthetic
- 🚀 **Production Ready**: Deploy anywhere - Netlify, Vercel, GitHub Pages, or any static host

## Tech Stack

- **Framework**: Gatsby.js 5
- **Language**: TypeScript with React/TSX
- **Styling**: Tailwind CSS + PostCSS
- **Data Source**: JSON files with GraphQL queries
- **AI**: OpenAI GPT-3.5 Turbo
- **Automation**: GitHub Actions

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. **Clone the repository**:
```bash
git clone https://github.com/afaryab/quote-generator.git
cd quote-generator
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key_here
EOF
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

## Quick Start

### Development

Start the Gatsby development server with hot module reloading:

```bash
npm run develop
```

The site will be available at:
- **Website**: http://localhost:8000
- **GraphQL Playground**: http://localhost:8000/___graphql

The development server automatically watches for changes and rebuilds in real-time.

### Production Build

Build the static site:

```bash
npm run build
```

This generates optimized, production-ready files in the `public/` directory.

**Serve locally**:

```bash
npm run serve
```

The production build will be available at http://localhost:9000

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run develop` | Start dev server with hot reload |
| `npm run build` | Build static site for production |
| `npm run serve` | Serve production build locally |
| `npm run clean` | Clear Gatsby cache |
| `npm run generate` | Generate a single new quote |
| `npm run generate:prod` | Generate quote + rebuild entire site |

## Configuration

### Global and Hourly Settings

Edit `config.json` to customize quote generation:

```json
{
  "global": {
    "theme": "inspiration",
    "tone": "uplifting",
    "audience": "general"
  },
  "hourly": {
    "0": { "theme": "new beginnings", "tone": "motivational", "audience": "early risers" },
    "6": { "theme": "gratitude", "tone": "warm", "audience": "professionals" },
    "12": { "theme": "perseverance", "tone": "encouraging", "audience": "hustlers" },
    "18": { "theme": "reflection", "tone": "thoughtful", "audience": "dreamers" },
    "23": { "theme": "peace", "tone": "calming", "audience": "night owls" }
  }
}
```

- **Global settings**: Used as fallback for hours without specific configuration
- **Hourly settings**: Override global settings for specific hours (0-23)

### GraphQL Nodes

The following node types are automatically created from quote JSON files:

- **LatestQuote**: Sourced from `data/quotes/latest.json`
- **TodayQuote**: Sourced from `data/quotes/today.json` (array of quotes)
- **HistoryQuote**: Sourced from `data/quotes/YYYY-MM-DD.json` files (organized by date)

## GitHub Actions Automation

The project includes automated quote generation via GitHub Actions.

### Setup

1. **Add OpenAI API Key as Secret**:
   - Go to your repository Settings
   - Navigate to Secrets and variables > Actions
   - Create new secret: `OPENAI_API_KEY`
   - Paste your OpenAI API key

2. **The Workflow**:
   - Runs automatically every hour (top of the hour)
   - Can be manually triggered anytime
   - Generates a new quote based on the current hour's configuration
   - Automatically commits and pushes changes to the repository

3. **Workflow File**: `.github/workflows/generate-quote.yml`

## Project Structure

```
quote-generator/
├── .github/
│   └── workflows/
│       └── generate-quote.yml       # Hourly automation
├── src/
│   ├── pages/
│   │   ├── index.tsx               # Home page (latest quote)
│   │   └── history.tsx             # History page (all quotes)
│   ├── components/
│   │   └── Layout.tsx              # Layout wrapper
│   ├── scripts/
│   │   └── generate-quote.ts       # Quote generation logic
│   └── styles/
│       └── global.css              # Global styles (Tailwind)
├── data/
│   └── quotes/                     # GraphQL data source
│       ├── latest.json
│       ├── today.json
│       └── YYYY-MM-DD.json
├── public/                         # Built static site
├── gatsby-config.js                # Gatsby configuration
├── gatsby-node.js                  # GraphQL node creation
├── gatsby-browser.js               # Browser API
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── config.json                     # Quote generation settings
└── package.json                    # Dependencies
```

## Data Storage

Quote data is stored as JSON in `/data/quotes/`:

### latest.json
```json
{
  "quote": "The only way to do great work is to love what you do.",
  "theme": "inspiration",
  "tone": "motivational",
  "audience": "professionals",
  "timestamp": "2025-12-13T20:30:00Z",
  "hour": 20
}
```

### today.json
```json
[
  { "quote": "...", "theme": "...", "tone": "...", "audience": "...", "timestamp": "...", "hour": 0 },
  { "quote": "...", "theme": "...", "tone": "...", "audience": "...", "timestamp": "...", "hour": 1 }
]
```

### YYYY-MM-DD.json
Historical quotes organized by date for easy browsing.

## Pages

### Home Page (`src/pages/index.tsx`)
- **Route**: `/`
- **Features**:
  - Full-screen, centered display
  - Soft gradient background
  - Latest quote with metadata
  - Link to history page
  - Smooth animations

### History Page (`src/pages/history.tsx`)
- **Route**: `/history`
- **Features**:
  - Navigation bar with logo
  - Today's quotes section
  - Historical quotes with date-based accordion
  - Full-width blockquote styling
  - Hover animations on quotes

## Deployment

The static site can be deployed to any hosting platform:

### Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `public/`
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy!

### Vercel
1. Import project from GitHub
2. Framework preset: Gatsby
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy!

### GitHub Pages
1. Build locally: `npm run build`
2. Deploy `public/` folder to GitHub Pages

### Other Static Hosts
Simply deploy the `public/` directory to any static hosting service.

## Development

### Customizing the Design

- **Colors**: Edit `tailwind.config.js`
- **Styles**: Edit `src/styles/global.css`
- **Fonts**: Modify CSS in `src/styles/global.css` or `tailwind.config.js`
- **Components**: Create new components in `src/components/`

### Adding New Fields

1. Update `src/scripts/generate-quote.ts` to include the new field
2. Update `gatsby-node.js` to source the field
3. Update TypeScript interfaces in your components
4. Update your GraphQL queries in pages

## Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

This is required for quote generation. The variable is used by `src/scripts/generate-quote.ts`.

## Troubleshooting

### Quotes not generating
- Verify `OPENAI_API_KEY` is set correctly
- Check GitHub Actions logs in the Actions tab
- Ensure quote files are being created in `data/quotes/`

### Build failing
- Clear cache: `npm run clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### GraphQL queries not working
- Visit GraphQL playground at http://localhost:8000/___graphql
- Verify quote files exist in `data/quotes/`
- Check `gatsby-node.js` for node creation logic

## License

ISC

## Author

Created by [afaryab](https://github.com/afaryab)
