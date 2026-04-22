import React from 'react';
import { QuoteCard } from './QuoteCard';

interface Quote {
  id: string;
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  author?: string;
}

interface QuoteTimelineProps {
  quotes: Quote[];
}

export const QuoteTimeline: React.FC<QuoteTimelineProps> = ({ quotes }) => {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No quotes found</p>
      </div>
    );
  }

  // Group quotes by date
  const groupedByDate = quotes.reduce((acc, quote) => {
    const date = new Date(quote.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(quote);
    return acc;
  }, {} as Record<string, Quote[]>);

  return (
    <div className="space-y-12">
      {Object.entries(groupedByDate).map(([date, dayQuotes]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <h2 className="text-xl font-semibold text-black">{date}</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Quotes for this date */}
          <div className="ml-8 space-y-4 border-l-2 border-gray-200 pl-8">
            {dayQuotes.map((quote) => (
              <QuoteCard key={quote.id} {...quote} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
