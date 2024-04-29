import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  palette: {
    mode: 'dark'
  },
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar ': {
            width: '4px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor: '#2D3250',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb: hover ': {
            backgroundColor: '#white',
            borderRadius: '8px'
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme