import { useState } from 'react'
import './App.css'
import './components/GameCard/GameCard'
import { GameCard, GamePreviewCard } from './components/GameCard/GameCard'
import './components/GameCard/GameCard.css' 


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Наша коллекция игр</h1>
        </div>
      </header>
        {/* <div>
          <button onClick={() => setCount((count) => count + 1)}>
            {count}
          </button>
        </div> */}
      <div className='bg-library-block container'>
        <GamePreviewCard className="bg-preview-card" name='Unmatched' genre='Дуэльная' imageUrl='/images/unmatched.jpg' avgPlayTime='45'></GamePreviewCard>
        <GamePreviewCard className="bg-preview-card" name='Осколки бесконечности' genre='Колодострой' imageUrl='/images/infshards.jpg' avgPlayTime='30'></GamePreviewCard>
        <GamePreviewCard className="bg-preview-card" name='Осколки бесконечности' genre='Колодострой' imageUrl='/images/infshards.jpg' avgPlayTime='30'></GamePreviewCard>
      </div>
    </>
  )
}

export default App
