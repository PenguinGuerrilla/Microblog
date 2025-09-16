import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './Contexts/AppContext.jsx'
import  NavigationProvider from './Contexts/NavigationContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <BrowserRouter>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </BrowserRouter>
  </AppProvider>
)
