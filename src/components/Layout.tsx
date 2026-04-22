import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  isHomePage?: boolean;
}

export default function Layout({ children, isHomePage }: LayoutProps) {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.6;
          color: #000;
        }

        body {
          background-color: #ffffff;
          ${isHomePage ? 'min-height: 100vh;' : ''}
          display: flex;
          flex-direction: column;
        }

        main {
          flex: 1;
        }
      `}</style>
      {children}
    </>
  );
}
