// src/sanity/schemaTypes/faqType.ts

import { defineType, defineField, defineArrayMember } from 'sanity'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  icon: QuestionMarkCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      title: 'Answer',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const faqGroupType = defineType({
  name: 'faqGroup',
  title: 'FAQ Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Group Title',
      description: 'Optional title for this group of FAQs.',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [defineArrayMember({ type: 'faq' })],
    }),
  ],
})
