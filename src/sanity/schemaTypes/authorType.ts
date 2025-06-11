import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email Address',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Image',
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
      name: 'bio',
      type: 'blockContent',
      title: 'Biography',
    }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Website',
    }),
    defineField({
      name: 'social',
      type: 'object',
      title: 'Social Media',
      fields: [
        { name: 'twitter', type: 'string', title: 'Twitter Handle' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'github', type: 'string', title: 'GitHub Username' },
        { name: 'instagram', type: 'string', title: 'Instagram Handle' },
      ],
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active Author',
      description: 'Whether this author is currently active',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      email: 'email',
    },
    prepare(selection) {
      const { email } = selection
      return { ...selection, subtitle: email }
    },
  },
})
