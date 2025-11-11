//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Stats from './pages/Stats.tsx'
import { Routes, Route, BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  /* <StrictMode> */
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/stats' element={<Stats />}></Route>
    </Routes>
  </BrowserRouter>
  /* </StrictMode>, */
)
