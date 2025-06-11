import { defineType, defineField } from 'sanity'
export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'Title for search engines (50-60 characters)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for social media sharing',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'No Index',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description: 'Specify canonical URL if different from current URL',
    }),
  ],
})
