import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { VehicleProvider } from './context/VehiclesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <VehicleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VehicleProvider>
  </AuthProvider>,
)
