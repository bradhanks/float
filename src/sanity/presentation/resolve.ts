import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),
    caseStudy: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        client: 'client',
        logo: 'logo',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Case Study',
            href: `/case-studies/${doc?.slug}`,
            logo: doc?.logo,
            client: doc?.client,
          },
          { title: 'Case Studies index', href: `/case-studies` },
        ],
      }),
    }),
  },
}
