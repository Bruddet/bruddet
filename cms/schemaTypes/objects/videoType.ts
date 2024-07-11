import {defineField, defineType} from 'sanity'

export const videoType = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  description: 'Legg til en video',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tittel',
      description: 'Tittel på videoen',
    }),
    defineField({
      name: 'muxVideo',
      type: 'mux.video',
      title: 'Mux Video',
      description: 'Velg en video',
      validation: (rule) => [rule.required().error('Video er påkrevd')],
    }),
  ],
})
