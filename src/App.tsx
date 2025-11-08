import './App.css'
import './components/GameCard/GameCard.css' 
import { BoardGameList } from './components/BoardGameList/BoardGameList'

// npx json-server db.json - запуск сервера

function App() {
  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Наша коллекция игр</h1>
        </div>
      </header>
        <BoardGameList className='bg-library-block container'></BoardGameList>
        {/* <div className='bg-library-block container'>
          <GamePreviewCard className="bg-preview-card" name='Unmatched' genre='Дуэльная' imageUrl='/images/unmatched.jpg' avgTimeInMinutes='45'></GamePreviewCard>
        </div> */}
        
    </>
  )
}

export default App
