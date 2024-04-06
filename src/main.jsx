import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import theme from './theme.js'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline theme={theme}>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </CssVarsProvider>
  </>
)
