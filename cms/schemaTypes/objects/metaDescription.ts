import {defineType} from 'sanity'

export default defineType({
  name: 'metaDescription',
  title: 'SEO beskrivelse',
  description: 'Kort sammendrag (maks 160 tegn)',
  type: 'string',
  validation: (rule) => [rule.required(), rule.max(160).warning('Maksimalt 160 tegn')],
})
