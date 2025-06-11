import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tag Title',
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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Tag Color',
      options: {
        disableAlpha: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
