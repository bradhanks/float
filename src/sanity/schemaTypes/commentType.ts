import { defineType, defineField } from 'sanity'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: ChatBubbleBottomCenterTextIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Commenter Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Website',
    }),
    defineField({
      name: 'content',
      type: 'text',
      title: 'Comment Content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'comment' }],
      title: 'Parent Comment',
      description: 'For threaded comments',
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: 'Whether this comment is approved for display',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created Date',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'ipAddress',
      type: 'string',
      title: 'IP Address',
      description: 'For moderation purposes',
    }),
    defineField({
      name: 'userAgent',
      type: 'string',
      title: 'User Agent',
      description: 'Browser information for moderation',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'content',
      approved: 'approved',
    },
    prepare(selection) {
      const { approved, subtitle } = selection
      return {
        ...selection,
        subtitle: `${approved ? '✓' : '⏳'} ${subtitle?.slice(0, 50)}...`,
      }
    },
  },
})
