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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        body {
          ${isHomePage ? 'background: linear-gradient(to bottom right, #f8fafc, #e0e7ff, #fce7f3);' : 'background-color: #f8fafc;'}
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
