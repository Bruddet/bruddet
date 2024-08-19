import {defineField, defineType} from 'sanity'
import {EditIcon} from '@sanity/icons'

export const reviewType = defineType({
  name: 'review',
  title: 'Anmeldelse',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'score',
      type: 'number',
      title: 'Score',
      validation: (rule) => [rule.min(1).max(5).error(`Score må være mellom 1 og 5`)],
    }),
    defineField({
      name: 'content',
      type: 'text',
      title: 'Innhold',
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(`Innhold er påkrevd for å poste et sitat, minimum lengde på 2 tegn`),
        rule.required().max(100).warning(`Anbefaler kortere innhold.`),
      ],
    }),
    defineField({
      name: 'source',
      type: 'string',
      title: 'Kilde',
      placeholder: 'e.g. Ola Nordmann',
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(`Kilde er påkrevd for å poste et sitat, minimum lengde på 2 tegn`),
      ],
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Selskap',
      placeholder: 'e.g. Aftenposten',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Lenke til anmeldelse',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Dato for sitat',
    }),
  ],
})
