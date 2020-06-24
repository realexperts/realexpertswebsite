module.exports = {
  siteMetadata: {
    title: 'Real Experts',
    twitterHandle: '@hut1315',
    siteUrl: 'https://www.realexperts.de',
  },
  mapping: {
    'MarkdownRemark.fields.featuredPost': 'MarkdownRemark',
    'MarkdownRemark.fields.relatedPosts': 'MarkdownRemark',
    'MarkdownRemark.fields.category': 'MarkdownRemark',
    'MarkdownRemark.fields.categories': 'MarkdownRemark',
    'MarkdownRemark.fields.successStories': 'MarkdownRemark',
    'MarkdownRemark.fields.infoBox': 'MarkdownRemark',
    'MarkdownRemark.fields.statements': 'MarkdownRemark',
    'MarkdownRemark.fields.author': 'MarkdownRemark',
    'SettingsJson.fields.defaultAuthor': 'MarkdownRemark',
    'SettingsJson.fields.link': 'MarkdownRemark',
  },
  plugins: [
    `gatsby-plugin-polyfill-io`,
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-plugin-slug',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://realexperts.us10.list-manage.com/subscribe/post?u=0765846df347ef60fe0336bdf&id=b40890bf31', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: `${__dirname}/src/settings`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'staticImages',
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: ALLOW-FROM https://www.itsax.de',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
          ],
        },
        mergeSecurityHeaders: false,
      },
    },
    'gatsby-plugin-netlify-cache',
  ],
};
