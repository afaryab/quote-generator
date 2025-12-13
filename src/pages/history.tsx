import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

interface Quote {
  id: string;
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  hour: number;
  date?: string;
}

interface GroupedQuotes {
  [date: string]: Quote[];
}

const QuoteBlockquote: React.FC<{
  quote: Quote;
  showHour?: boolean;
}> = ({ quote, showHour }) => (
  <blockquote className="quote-blockquote">
    <p className="quote-text">{quote.quote}</p>
    <footer className="quote-footer">
      <span className="meta-badge">{quote.theme}</span>
      <span className="meta-badge">{quote.tone}</span>
      <span className="meta-badge">{quote.audience}</span>
      <span className="meta-time">
        {showHour && `Hour ${quote.hour} • `}
        {new Date(quote.timestamp).toLocaleTimeString()}
      </span>
    </footer>
  </blockquote>
);

export default function HistoryPage() {
  const data = useStaticQuery(graphql`
    query {
      todayQuotes: allTodayQuote(sort: { timestamp: ASC }) {
        edges {
          node {
            id
            quote
            theme
            tone
            audience
            timestamp
            hour
          }
        }
      }
      historyQuotes: allHistoryQuote(sort: { timestamp: DESC }) {
        edges {
          node {
            id
            quote
            theme
            tone
            audience
            timestamp
            hour
            date
          }
        }
      }
    }
  `);

  const todayQuotes = data.todayQuotes.edges.map((edge: any) => edge.node);

  // Group historical quotes by date
  const historyQuotes = data.historyQuotes.edges.map((edge: any) => edge.node);
  const grouped: GroupedQuotes = {};

  historyQuotes.forEach((quote: Quote) => {
    if (!grouped[quote.date!]) {
      grouped[quote.date!] = [];
    }
    grouped[quote.date!].push(quote);
  });

  const sortedDates = Object.keys(grouped).sort().reverse();

  return (
    <>
      <Helmet>
        <title>Quote Generator - History</title>
        <meta name="description" content="View all generated quotes" />
      </Helmet>

      <nav className="navbar">
        <div className="container">
          <h1 className="logo">✨ Quote Generator</h1>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history" className="active">
                History
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container">
        <section className="history-section">
          <h2>Quote History</h2>

          {/* Today's Quotes Section */}
          <div className="today-section">
            <h3>Today's Quotes</h3>
            {todayQuotes.length > 0 ? (
              <div className="quotes-list">
                {todayQuotes.map((quote: Quote) => (
                  <QuoteBlockquote key={quote.id} quote={quote} />
                ))}
              </div>
            ) : (
              <p className="no-quotes">No quotes generated today yet.</p>
            )}
          </div>

          {/* Historical Quotes Section */}
          <div className="history-accordion">
            <h3>Historical Quotes</h3>
            {sortedDates.length > 0 ? (
              <>
                {sortedDates.map((date) => {
                  const displayDate = new Date(date).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  );
                  const dayQuotes = grouped[date];

                  return (
                    <div key={date} className="accordion-item">
                      <button
                        className="accordion-header"
                        onClick={(e) => {
                          const item = (e.target as HTMLElement).closest(
                            '.accordion-item'
                          );
                          if (item) {
                            item.classList.toggle('active');
                          }
                        }}
                      >
                        <span className="date">{displayDate}</span>
                        <span className="count">
                          {dayQuotes.length} quotes
                        </span>
                        <span className="arrow">▼</span>
                      </button>
                      <div className="accordion-content">
                        <div className="quotes-list">
                          {dayQuotes.map((quote: Quote) => (
                            <QuoteBlockquote
                              key={quote.id}
                              quote={quote}
                              showHour={true}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="no-quotes">
                No historical quotes available yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Quote Generator. Powered by OpenAI.</p>
        </div>
      </footer>

      <style>{`
        body {
          background-color: #f8fafc;
        }

        .home-quote-container {
          background: linear-gradient(to bottom right, #f8fafc, #e0e7ff, #fce7f3);
        }
      `}</style>
    </>
  );
}
