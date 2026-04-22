import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

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
        <title>Daily Inspiration</title>
        <meta
          name="description"
          content="Daily inspirational quotes generated with OpenAI"
        />
      </Helmet>

      <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center flex-1">
          {/* Main Quote */}
          <div className="mb-12 flex-1 flex flex-col justify-center">
            {/* Opening Quote Mark */}
            <div className="mb-12">
              <span className="text-7xl md:text-9xl text-gray-300 font-serif leading-none">"</span>
            </div>

            {/* Quote Text */}
            <blockquote className="mb-12">
              <p className="text-3xl md:text-5xl lg:text-6xl font-light text-black leading-relaxed">
                {latestQuote.quote}
              </p>
            </blockquote>

            {/* Closing Quote Mark */}
            <div className="mb-12">
              <span className="text-7xl md:text-9xl text-gray-300 font-serif leading-none">"</span>
            </div>

            {/* Quote Metadata */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="inline-flex items-center px-4 py-2 bg-black text-white text-xs md:text-sm font-medium rounded">
                {latestQuote.theme}
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-xs md:text-sm font-medium rounded">
                {latestQuote.tone}
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-xs md:text-sm font-medium rounded">
                {latestQuote.audience}
              </span>
            </div>
          </div>

          {/* Navigation - Bottom aligned */}
          <Link
            to="/history"
            className="inline-flex items-center"
          >
            <Button className="px-8 py-6 md:px-10 md:py-7 text-base md:text-lg font-semibold">
              <span>View All Quotes</span>
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
