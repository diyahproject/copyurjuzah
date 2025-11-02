import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'aos/dist/aos.css'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
