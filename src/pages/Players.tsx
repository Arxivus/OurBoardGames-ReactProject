import { DropMenu } from '../components/DropMenu/DropMenu'

function Players() {
  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Наша коллекция игр</h1>
          <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
        </div>
      </header>
      <footer>
      </footer> 
    </>
  )
}

export default Players