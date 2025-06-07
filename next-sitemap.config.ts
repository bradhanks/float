import type { IConfig } from 'next-sitemap'
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.seedtoseries.com',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
    ],

  },
  transform: async (config: IConfig, path: URL) => {
    // Custom transformation logic if needed
    return {
      loc: path, // The URL of the page
      lastmod: new Date().toISOString(), // Last modified date
      changefreq: 'weekly', // Change frequency
      priority: 0.7, // Priority of the page
    };
  },
  additionalPaths: async (config: IConfig) => {
    // Additional paths to include in the sitemap
    return [
      { loc: '/blog', lastmod: new Date().toISOString() },
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() },
    ];
  },
}
