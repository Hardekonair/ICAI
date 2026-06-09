import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter  } from 'react-router-dom'  //(provides routing context) as Routes / Link / Route  (consume context)
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode is a special wrapper component provided by React that helps you detect potential problems in your app during development. e.g. useEffect running twice API calls happening twice
  // <StrictMode>  
  // RESPONSIBLE FOR MAKING SINGLE PAGE APPLICATION - ONE PAGE LEADS TO MULTIPLE PAGES
  <BrowserRouter>  
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>  
  <AuthProvider>    
      <App /> 
  </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
    // <Signup />
  // </StrictMode>,
)

  // <AuthProvider>   PROVIDES AUTH CONTEXT TO ENTIRE APP
