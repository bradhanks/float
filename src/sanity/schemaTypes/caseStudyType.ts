import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@heroicons/react/24/outline'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Case Study Title',
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
