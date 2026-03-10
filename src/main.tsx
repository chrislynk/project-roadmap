import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CheckboxProvider } from './contexts/CheckboxContext.tsx'
import { RoadmapProvider } from './contexts/RoadmapContext.tsx'
import { EditProvider } from './contexts/EditContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RoadmapProvider>
        <EditProvider>
          <CheckboxProvider>
            <App />
          </CheckboxProvider>
        </EditProvider>
      </RoadmapProvider>
    </AuthProvider>
  </StrictMode>,
)
