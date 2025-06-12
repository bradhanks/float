import { defineType, defineField } from 'sanity'
import { CogIcon } from '@heroicons/react/24/outline'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  __experimental_omnisearch_visibility: false,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Site Description',
      description: 'Brief description of your site',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Site Logo',
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
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Small icon for browser tabs',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Site URL',
      description: 'The main URL of your website',
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Contact Email',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Contact Phone',
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Address',
    }),
    defineField({
      name: 'social',
      type: 'object',
      title: 'Social Media',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'tiktok', type: 'url', title: 'TikTok' },
      ],
    }),
    defineField({
      name: 'analytics',
      type: 'object',
      title: 'Analytics',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'string',
          title: 'Google Analytics ID',
        },
        {
          name: 'googleTagManager',
          type: 'string',
          title: 'Google Tag Manager ID',
        },
        { name: 'facebookPixel', type: 'string', title: 'Facebook Pixel ID' },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Default SEO Settings',
    }),
    defineField({
      name: 'maintenance',
      type: 'object',
      title: 'Maintenance Mode',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Maintenance Mode',
          initialValue: false,
        },
        {
          name: 'message',
          type: 'text',
          title: 'Maintenance Message',
          description: 'Message to show when site is in maintenance mode',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
