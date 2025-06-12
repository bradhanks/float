import { defineField, defineType } from 'sanity'
import { Bars3Icon } from '@heroicons/react/24/outline'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: Bars3Icon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Menu Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Menu Location',
      options: {
        list: [
          { title: 'Primary Navigation', value: 'primary' },
          { title: 'Footer', value: 'footer' },
          { title: 'Mobile Menu', value: 'mobile' },
          { title: 'Social Menu', value: 'social' },
        ],
      },
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Menu Items',
      of: [
        {
          type: 'object',
          title: 'Menu Item',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Menu Label',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
            {
              name: 'page',
              type: 'reference',
              to: [{ type: 'page' }, { type: 'post' }],
              title: 'Internal Link',
              description: 'Link to internal page or post',
            },
            {
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in new tab',
              initialValue: false,
            },
            {
              name: 'children',
              type: 'array',
              title: 'Sub-menu Items',
              of: [
                {
                  type: 'object',
                  title: 'Sub-menu Item',
                  fields: [
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Menu Label',
                    },
                    {
                      name: 'url',
                      type: 'url',
                      title: 'URL',
                    },
                    {
                      name: 'page',
                      type: 'reference',
                      to: [{ type: 'page' }, { type: 'post' }],
                      title: 'Internal Link',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
    },
    prepare(selection) {
      const { location } = selection
      return {
        ...selection,
        subtitle: location,
      }
    },
  },
})
