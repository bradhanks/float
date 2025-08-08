// src/sanity/schemaTypes/reviewType.ts

import { defineType, defineField } from 'sanity'
import { StarIcon } from '@heroicons/react/24/outline'


export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'A rating from 1 to 5.',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'reviewBody',
      type: 'text',
      title: 'Review Body',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'datePublished',
      type: 'date',
      title: 'Date Published',
    }),
  ],
})
