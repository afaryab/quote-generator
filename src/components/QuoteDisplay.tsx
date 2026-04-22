import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

interface QuoteDisplayProps {
  quote: string;
  theme: string;
  tone: string;
  audience: string;
  timestamp: string;
  author?: string;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  quote,
  theme,
  tone,
  audience,
  timestamp,
  author,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    const text = author ? `"${quote}" — ${author}` : `"${quote}"`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const dateObj = new Date(timestamp);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Main Quote Display */}
      <div className="bg-white rounded-lg p-8 md:p-12 mb-8">
        <div className="mb-8 text-gray-300">
          <span className="text-6xl md:text-8xl font-serif">"</span>
        </div>

        <blockquote className="mb-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-black italic">
            {quote}
          </p>
        </blockquote>

        {author && (
          <p className="text-lg text-gray-600 mb-8 font-medium">
            — {author}
          </p>
        )}

        <div className="mb-8 text-gray-300">
          <span className="text-6xl md:text-8xl font-serif">"</span>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-black text-white rounded">
            {theme}
          </span>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-gray-200 text-black rounded">
            {tone}
          </span>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-gray-100 text-black rounded">
            {audience}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          {dateStr} at {timeStr}
        </p>

        {/* Copy Button */}
        <Button
          onClick={handleCopyToClipboard}
          variant="outline"
          className="w-full md:w-auto border-black text-black hover:bg-black hover:text-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Quote
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
