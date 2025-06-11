import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Page Excerpt',
      description: 'Brief description of the page',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Page Content',
    }),
    defineField({
      name: 'template',
      type: 'string',
      title: 'Page Template',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Full Width', value: 'full-width' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Contact', value: 'contact' },
          { title: 'About', value: 'about' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Private', value: 'private' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'showInNavigation',
      type: 'boolean',
      title: 'Show in Navigation',
      description: 'Include this page in the main navigation menu',
      initialValue: false,
    }),
    defineField({
      name: 'navigationOrder',
      type: 'number',
      title: 'Navigation Order',
      description: 'Order in navigation menu (lower numbers first)',
      hidden: ({ document }) => !document?.showInNavigation,
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'page' }],
      title: 'Parent Page',
      description: 'Select a parent page for hierarchical organization',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      status: 'status',
    },
    prepare(selection) {
      const { status } = selection
      return {
        ...selection,
        subtitle: status,
      }
    },
  },
})
