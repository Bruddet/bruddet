//These are temporary values, they will be replaced by the actual values from the design system

const COLORCOMBINATIONS = [
  {title: 'Lys blå primær, sort sekundær', value: 'dayThemeBlueBlack', theme: 'day'},
  {title: 'Lys orange primær, blå sekundær', value: 'dayThemePeachBlue', theme: 'day'},
  {title: 'Kremhvit primær, blå sekundær', value: 'dayThemeCreamBlue', theme: 'day'},
  {title: 'Mørk lilla primær, hvit sekundær', value: 'nightThemePurpleWhite', theme: 'night'},
  {title: 'Mørk blå primær, gul sekundær', value: 'nightThemeBlueYellow', theme: 'night'},
]

const dayThemes = COLORCOMBINATIONS.filter((theme) => theme.theme === 'day')
const nightThemes = COLORCOMBINATIONS.filter((theme) => theme.theme === 'night')

export const colorCombinationsDay = {
  name: 'colorCombinationsDay',
  title: 'Fargekombinasjon',
  type: 'string',
  options: {
    list: dayThemes.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: dayThemes[0].value,
  },
}

export const colorCombinationsNight = {
  name: 'colorCombinationsNight',
  title: 'Fargekombinasjon',
  type: 'string',
  options: {
    list: nightThemes.map(({title, value}) => ({title, value})),
    layout: 'radio',
    default: nightThemes[0].value,
  },
}
