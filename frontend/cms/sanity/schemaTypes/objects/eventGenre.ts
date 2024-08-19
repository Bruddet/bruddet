const EVENTGENRE = [
  {
    title: 'Konsert',
    value: 'Konsert',
  },
  {
    title: 'Skuespill',
    value: 'Skuespill',
  },
]

const eventGenre = {
  name: 'eventGenre',
  title: 'Sjanger',
  type: 'string',
  options: {
    list: EVENTGENRE.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: EVENTGENRE[0].title,
  },
}

export default eventGenre
