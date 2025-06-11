// next-sitemap.config.js

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.seedtoseries.com',
  generateRobotsTxt: true,
  sitemapSize: 700,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
    '/thank-you',
    '/preview',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/_next/' },
      { userAgent: '*', disallow: '/static/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/admin/' },
      { userAgent: '*', disallow: '/private/' },
      { userAgent: '*', disallow: '/404' },
      { userAgent: '*', disallow: '/500' },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://www.seedtoseries.com'}/sitemap.xml`,
      `${process.env.SITE_URL || 'https://www.seedtoseries.com'}/sitemap-images.xml`,
      // Add more if needed (e.g., video, blog, etc.)
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      ...(path.startsWith('/blog/') && {
        images: [
          {
            loc: 'https://www.seedtoseries.com/images/blog-post-image.jpg',
            title: 'Blog Post Featured Image',
            caption: 'A descriptive caption for the image',
          },
        ],
      }),
    }
  },
  additionalPaths: async (config) => {
    return [
      {
        loc: '/blog',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
        images: [
          {
            loc: 'https://www.seedtoseries.com/images/blog-home.jpg',
            title: 'Blog Homepage Image',
            caption: 'Cover image for blog homepage',
          },
        ],
      },
    ]
  },
}
