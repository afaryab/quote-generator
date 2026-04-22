import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Button } from '../components/ui/button';
import { QuoteTimeline } from '../components/QuoteTimeline';
import { ChevronLeft } from 'lucide-react';

interface Quote {
  id: string;
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  hour: number;
  author?: string;
}

export default function HistoryPage() {
  const data = useStaticQuery(graphql`
    query {
      allHistoryQuote(sort: { timestamp: DESC }) {
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

  const quotes: Quote[] = data.allHistoryQuote.edges.map((edge: any) => ({
    ...edge.node,
  }));

  return (
    <>
      <Helmet>
        <title>Quote Timeline</title>
        <meta name="description" content="Timeline of all generated quotes" />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="bg-black text-white py-12 px-4">
          <div className="w-full max-w-5xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center mb-6 hover:opacity-80 transition-opacity"
            >
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Today
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-light mb-2">Quote Timeline</h1>
            <p className="text-gray-300">Browse through all generated quotes</p>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 py-12 px-4">
          <div className="w-full max-w-5xl mx-auto">
            {quotes.length > 0 ? (
              <QuoteTimeline quotes={quotes} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No quotes found yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
