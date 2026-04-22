import React from 'react';
import { Link } from 'gatsby';
import { cn } from '../lib/utils';

interface QuoteCardProps {
  id: string;
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  author?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  id,
  quote,
  theme,
  tone,
  audience,
  timestamp,
  author,
}) => {
  const dateObj = new Date(timestamp);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Link
      to={`/quote?id=${id}`}
      className="block no-underline group"
    >
      <div className={cn(
        "p-8 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all duration-300",
        "hover:border-black cursor-pointer"
      )}>
        <blockquote className="mb-6">
          <p className="text-xl md:text-2xl font-light leading-relaxed text-black italic">
            "{quote}"
          </p>
        </blockquote>

        {author && (
          <p className="text-sm text-gray-600 mb-4">— {author}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded">
            {theme}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-black rounded">
            {tone}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-black rounded">
            {audience}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {dateStr} at {timeStr}
        </p>
      </div>
    </Link>
  );
};
