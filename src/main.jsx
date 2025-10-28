import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ExtendProvider, useExtended } from './context/ExtendContext.jsx';  
import { FormProvider, useForm } from './context/FormContext.jsx';  
import { DarkModeProvider } from "./DarkModeContext";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FormProvider>
      <ExtendProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
      </ExtendProvider>
      </FormProvider>
  </StrictMode>,
)
