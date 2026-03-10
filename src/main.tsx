import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CheckboxProvider } from './contexts/CheckboxContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CheckboxProvider>
      <App />
    </CheckboxProvider>
  </StrictMode>,
)
