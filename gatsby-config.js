/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Zolo's Blog`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `@isamrish/gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: "ca-pub-9705299065641577",
        head: true, // Optional
      },
    },
    `gatsby-transformer-remark`,
  ],
}
