import './Stats.css'
import { DropMenu } from '../components/DropMenu/DropMenu'
import { Form } from '../components/Form/Form'

function Stats() {
  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Наша коллекция игр</h1>
          <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
        </div>
      </header>
      <section className='container'>
        
      </section>
      <footer>
      </footer> 
    </>
  )
}

export default Stats