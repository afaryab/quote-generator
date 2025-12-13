import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import '../styles/global.css';

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
  <blockquote className="w-full m-0 p-8 bg-white border-l-4 border-indigo-600 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
    <p className="text-xl leading-relaxed text-gray-700 m-0 italic font-normal">
      {quote.quote}
    </p>
    <footer className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
      <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        {quote.theme}
      </span>
      <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        {quote.tone}
      </span>
      <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        {quote.audience}
      </span>
      <span className="ml-auto text-gray-500 text-xs">
        {showHour && `Hour ${quote.hour} • `}
        {new Date(quote.timestamp).toLocaleTimeString()}
      </span>
    </footer>
  </blockquote>
);

export default function HistoryPage() {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

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
    }
  `);

  const todayQuotes = data.todayQuotes?.edges?.map((edge: any) => edge.node) || [];
  const historyQuotes: Quote[] = [];
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

      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent m-0">
              ✨ Quote Generator
            </h1>
            <ul className="flex gap-6 list-none m-0 p-0">
              <li>
                <Link to="/" className="text-gray-900 font-medium no-underline hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-indigo-600 font-medium no-underline">
                  History
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
          <section>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
              Quote History
            </h2>

            {/* Today's Quotes Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Today's Quotes
              </h3>
              {todayQuotes.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {todayQuotes.map((quote: Quote) => (
                    <QuoteBlockquote key={quote.id} quote={quote} />
                  ))}
                </div>
              ) : (
                <p className="bg-white p-8 rounded text-center text-slate-500 italic shadow">
                  No quotes generated today yet.
                </p>
              )}
            </div>

            {/* Historical Quotes Section */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Historical Quotes
              </h3>
              {sortedDates.length > 0 ? (
                <>
                  {sortedDates.map((date) => {
                    const displayDate = new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                    const dayQuotes = grouped[date];
                    const isExpanded = expandedDate === date;

                    return (
                      <div key={date} className="bg-white rounded mb-2 overflow-hidden shadow hover:shadow-md transition-all">
                        <button
                          onClick={() => setExpandedDate(isExpanded ? null : date)}
                          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-600 text-white border-none p-4 font-semibold cursor-pointer flex justify-between items-center transition-all duration-300 hover:from-indigo-700 hover:to-indigo-700"
                        >
                          <span className="flex-1 text-left">{displayDate}</span>
                          <span className="text-sm opacity-90 mr-4">
                            {dayQuotes.length} quotes
                          </span>
                          <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="p-6 bg-gray-50 flex flex-col gap-6 animate-fade-in">
                            {dayQuotes.map((quote: Quote) => (
                              <QuoteBlockquote key={quote.id} quote={quote} showHour={true} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="bg-white p-8 rounded text-center text-slate-500 italic shadow">
                  No historical quotes available yet.
                </p>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm m-0">
              &copy; 2025 Quote Generator. Powered by OpenAI.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
