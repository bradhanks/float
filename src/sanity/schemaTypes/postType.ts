import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { defineField, defineType, defineArrayMember } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
      title: 'Excerpt',
      description: 'Brief description of the post',
      rows: 3,
    }),
    defineField({
      name: 'author',
      // the different type options are the following:
      // 'string' for a simple text field,
      // 'image' for an image field,
      // 'reference' for a reference to another document,
      // 'array' for an array of items,
      // 'boolean' for a true/false field,
      // 'datetime' for a date and time field,
      // 'number' for a numeric field,
      // 'blockContent' for rich text content,
      // 'seo' for SEO settings,
      // 'faqGroup' for a FAQ group,
      // 'review' for a review section.
      
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coAuthors',
      type: 'array',
      title: 'Co-Authors',
      of: [{ type: 'reference', to: { type: 'author' } }],
    }),
    defineField({
      name: 'mainImage',
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
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Last Updated',
      description: 'The date the post was last updated. This is updated automatically.',
      // This makes the field read-only in the studio, as it's handled programmatically.
      readOnly: true,
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Private', value: 'private' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Post',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'sticky',
      type: 'boolean',
      title: 'Sticky Post',
      description: 'Keep this post at the top of listings',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Content',
    }),
    defineField({
      name: 'readingTime',
      type: 'number',
      title: 'Reading Time (minutes)',
      description: 'Estimated reading time in minutes',
    }),
    defineField({
      name: 'relatedPosts',
      type: 'array',
      title: 'Related Posts',
      of: [{ type: 'reference', to: { type: 'post' } }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      of: [defineArrayMember({ type: 'faqGroup' })],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [defineArrayMember({ type: 'review' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      status: 'status',
    },
    prepare(selection) {
      const { author, status } = selection
      return {
        ...selection,
        subtitle: `${author} • ${status}`,
      }
    },
  },
})
