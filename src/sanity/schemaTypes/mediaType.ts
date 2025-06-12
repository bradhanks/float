import { defineType, defineField } from 'sanity'
import { PhotoIcon } from '@heroicons/react/24/outline'

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  icon: PhotoIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for accessibility and SEO',
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Caption',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'uploadedAt',
      type: 'datetime',
      title: 'Upload Date',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'file',
    },
  },
})
