import './Collection.css'
import { BoardGameList } from '../components/BoardGameList/BoardGameList'
import { IconButton } from '../components/IconButton/IconButton'
import { DropMenu } from '../components/DropMenu/DropMenu'

// npx json-server db.json - запуск сервера

function Collection() {
  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Наша коллекция игр</h1>
          <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
        </div>
      </header>
      <div className='operation-btns container'>
        <IconButton text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton>
        <IconButton text='Добавить' iconUrl='/images/plus.svg'></IconButton>
      </div>
      <BoardGameList className='bg-library-block container'></BoardGameList>
      <footer>
      </footer> 
    </>
  )
}

export default Collection
