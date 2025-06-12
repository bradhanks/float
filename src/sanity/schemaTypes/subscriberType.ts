import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export const subscriberType = defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email Address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'subscribed',
      type: 'boolean',
      title: 'Subscribed',
      description: 'Whether the user is currently subscribed',
      initialValue: true,
    }),
    defineField({
      name: 'subscribedAt',
      type: 'datetime',
      title: 'Subscription Date',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'unsubscribedAt',
      type: 'datetime',
      title: 'Unsubscription Date',
    }),
    defineField({
      name: 'source',
      type: 'string',
      title: 'Subscription Source',
      options: {
        list: [
          { title: 'Website Form', value: 'website' },
          { title: 'Pop-up', value: 'popup' },
          { title: 'Footer', value: 'footer' },
          { title: 'Blog Post', value: 'blog' },
          { title: 'Social Media', value: 'social' },
          { title: 'Manual Import', value: 'import' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subscribed: 'subscribed',
    },
    prepare(selection) {
      const { subscribed } = selection
      return {
        ...selection,
        subtitle: subscribed ? 'Subscribed' : 'Unsubscribed',
      }
    },
  },
})
