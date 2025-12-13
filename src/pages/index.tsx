import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import '../styles/global.css';

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

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-pink-50 p-8">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-8 leading-tight italic">
            <span className="text-5xl sm:text-6xl lg:text-7xl text-indigo-300 opacity-50">"</span>
            {latestQuote.quote}
            <span className="text-5xl sm:text-6xl lg:text-7xl text-indigo-300 opacity-50">"</span>
          </h1>

          <div className="mt-8 text-gray-600 space-y-3">
            <div className="mb-2">
              <span className="font-semibold text-slate-900">Theme:</span> {latestQuote.theme}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-slate-900">Tone:</span> {latestQuote.tone}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-slate-900">Audience:</span> {latestQuote.audience}
            </div>
            <div className="mb-6">
              <span className="font-semibold text-slate-900">Generated:</span>{' '}
              {new Date(latestQuote.timestamp).toLocaleString()}
            </div>

            <div className="mt-8">
              <Link
                to="/history"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white no-underline rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                View History →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
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
