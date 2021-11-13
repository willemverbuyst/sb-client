import { createTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles' {
  interface ThemeOptions {
    themeName?: string // optional
  }
}

const palette = {
  primary: { main: '#1e5eb1' },
  secondary: { main: '#EA9C3B' },
}

const themeName = 'IceBlueGold'

export default createTheme({ palette, themeName })
