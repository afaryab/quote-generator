module.exports = {
  siteMetadata: {
    title: 'Quote Generator',
    description: 'Daily inspirational quotes generated with OpenAI',
    author: '@afaryab',
    siteUrl: 'https://quote-generator.netlify.app',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'quotes',
        path: `${__dirname}/data/quotes`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
