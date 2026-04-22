import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Button } from '../components/ui/button';
import { QuoteDisplay } from '../components/QuoteDisplay';
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

interface QuotePageProps {
  pageContext?: {
    quote: Quote;
  };
  location?: {
    search: string;
  };
}

export default function QuotePage({ pageContext, location }: QuotePageProps) {
  const data = useStaticQuery(graphql`
    query {
      allHistoryQuote {
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

  // Get quote from pageContext (for static generation) or from URL params (for client)
  let quote = pageContext?.quote;

  if (!quote && typeof window !== 'undefined' && location) {
    const params = new URLSearchParams(location.search);
    const quoteId = params.get('id');
    if (quoteId) {
      const found = data.allHistoryQuote.edges.find((edge: any) => edge.node.id === quoteId);
      quote = found?.node;
    }
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-light text-black mb-4">Quote not found</h1>
          <Link
            to="/history"
            className="inline-flex"
          >
            <Button>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to History
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quote - {quote.theme}</title>
        <meta name="description" content={`"${quote.quote}" - ${quote.theme} quote`} />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Header with back button */}
        <div className="bg-black text-white py-6 px-4 sticky top-0 z-10">
          <div className="w-full max-w-5xl mx-auto">
            <Link
              to="/history"
              className="inline-flex"
            >
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Timeline
              </Button>
            </Link>
          </div>
        </div>

        {/* Quote Display */}
        <div className="flex-1 flex items-center justify-center py-12">
          <QuoteDisplay
            quote={quote.quote}
            theme={quote.theme}
            tone={quote.tone}
            audience={quote.audience}
            timestamp={quote.timestamp}
            author={quote.author}
          />
        </div>
      </div>
    </>
  );
}