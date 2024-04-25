import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import theme from './theme.js'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './pages/Auth/AuthProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <CssBaseline theme={theme}>
            <App />
            <ToastContainer containerStyle={{
              zIndex: '9999 !important'
            }}
            toastOptions={{
              className: 'react-hot-toast',
              style: {
                zIndex: '9999 !important'
              }
            }} theme="colored" position="bottom-left" closeOnClick autoClose={5000}/>
          </CssBaseline>
        </BrowserRouter>
      </AuthProvider>
    </CssVarsProvider>
  </>
)
