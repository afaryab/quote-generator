import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query {
      latestQuote {
        quote
        theme
        tone
        audience
        timestamp
        hour
      }
    }
  `);

  const { latestQuote } = data;

  return (
    <>
      <Helmet>
        <title>Quote Generator - Daily Inspiration</title>
        <meta
          name="description"
          content="Daily inspirational quotes generated with OpenAI"
        />
      </Helmet>

      <main className="home-quote-container">
        <div className="quote-display animate-slide-up">
          <div className="quote-text">
            <span className="quote-icon">"</span>
            {latestQuote.quote}
            <span className="quote-icon">"</span>
          </div>
          <div className="quote-meta">
            <div className="meta-item">
              <span className="meta-label">Theme:</span> {latestQuote.theme}
            </div>
            <div className="meta-item">
              <span className="meta-label">Tone:</span> {latestQuote.tone}
            </div>
            <div className="meta-item">
              <span className="meta-label">Audience:</span>{' '}
              {latestQuote.audience}
            </div>
            <div className="meta-item">
              <span className="meta-label">Generated:</span>{' '}
              {new Date(latestQuote.timestamp).toLocaleString()}
            </div>
            <div className="meta-item">
              <Link to="/history" className="history-link">
                View History →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
