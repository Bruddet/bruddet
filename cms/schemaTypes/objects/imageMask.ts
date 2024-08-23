const IMAGEMASK = [
  {
    title: 'Mindre bilde, som ikke dekker hele bredden på skjermen',
    value: 'smallImageNotCoveringScreen',
  },
  {title: 'Større bilde, som dekker hele bredden på skjermen', value: 'bigImageCoveringScreen'},
]
const imageMask = {
  name: 'imageMask',
  title: 'Visning av bildet',
  type: 'string',
  options: {
    list: IMAGEMASK.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: IMAGEMASK[0].value,
  },
}

export default imageMask
