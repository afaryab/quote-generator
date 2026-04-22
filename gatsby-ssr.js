import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
      key="google-fonts-preconnect"
    />,
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
      key="google-fonts-preconnect-crossorigin"
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
      key="google-fonts-inter"
    />,
  ]);
};
