//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Collection from './pages/Collection.tsx'
import Stats from './pages/Stats.tsx'
import Players from './pages/Players.tsx'
import GameInfo from './pages/GameInfo.tsx'
import { Routes, Route, BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  /* <StrictMode> */
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Collection />}></Route>
      <Route path='/stats' element={<Stats />}></Route>
      <Route path='/players' element={<Players />}></Route>
      <Route path='/:id' element={<GameInfo />}></Route>
    </Routes>
  </BrowserRouter>
  /* </StrictMode>, */
)
