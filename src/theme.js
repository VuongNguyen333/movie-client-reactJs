import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar ': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor: '#1a1d29',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb: hover ': {
            backgroundColor: '#1a1d29',
            borderRadius: '8px'
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme