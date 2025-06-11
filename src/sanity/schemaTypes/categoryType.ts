import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Category Title',
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
      title: 'Category Color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Parent Category',
      description: 'Select a parent category for hierarchical organization',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Category Image',
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
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      parent: 'parent.title',
    },
    prepare(selection) {
      const { parent } = selection
      return {
        ...selection,
        subtitle: parent ? `Child of ${parent}` : 'Root category',
      }
    },
  },
})
