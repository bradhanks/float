import { defineType, defineField } from 'sanity'

import { CalendarIcon } from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Event Title',
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
      name: 'description',
      type: 'blockContent',
      title: 'Event Description',
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
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
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date & Time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date & Time',
    }),
    defineField({
      name: 'allDay',
      type: 'boolean',
      title: 'All Day Event',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      type: 'object',
      title: 'Location',
      fields: [
        { name: 'name', type: 'string', title: 'Venue Name' },
        { name: 'address', type: 'text', title: 'Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State/Province' },
        { name: 'zipCode', type: 'string', title: 'Zip/Postal Code' },
        { name: 'country', type: 'string', title: 'Country' },
        { name: 'coordinates', type: 'geopoint', title: 'GPS Coordinates' },
      ],
    }),
    defineField({
      name: 'organizer',
      type: 'reference',
      to: [{ type: 'author' }],
      title: 'Event Organizer',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Ticket Price',
      description: 'Leave empty for free events',
    }),
    defineField({
      name: 'maxAttendees',
      type: 'number',
      title: 'Maximum Attendees',
    }),
    defineField({
      name: 'registrationUrl',
      type: 'url',
      title: 'Registration URL',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Event Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Postponed', value: 'postponed' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Event',
      initialValue: false,
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
      media: 'featuredImage',
      startDate: 'startDate',
      status: 'status',
    },
    prepare(selection) {
      const { startDate, status } = selection
      const date = startDate
        ? new Date(startDate).toLocaleDateString()
        : 'No date'
      return {
        ...selection,
        subtitle: `${date} • ${status}`,
      }
    },
  },
})
