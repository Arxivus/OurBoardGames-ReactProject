import './Stats.css'
import { DropMenu } from '../components/DropMenu/DropMenu'
import { Form } from '../components/Form/Form'
import { ModalWindow } from '../components/ModalWindow/ModalWindow'
import { IconButton } from '../components/IconButton/IconButton'
import { type Match, MatchesList } from '../components/MatchesList/MatchesList'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Stats() {
  const [isOpen, setIsOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>()

  const getMatches = () => {
    axios.get('http://localhost:3000/matches')
      .then(response => {
        setMatches(response.data)
        console.log('Партии загружены');
      })
      .catch(error => console.log(error.message));

  }

  useEffect(() => {
    getMatches()
  }, [])


  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png' />
          <h1>Статистика партий</h1>
          <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
        </div>
      </header>
      <div className='operation-btns container'>
        <IconButton className='shadow-effect' onClick={() => { }} text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton>
        <IconButton className='shadow-effect' onClick={() => setIsOpen(true)} text='Добавить' iconUrl='/images/plus.svg'></IconButton>
      </div>
      <section className='container'>
        <MatchesList matches={matches}></MatchesList>
        {isOpen ?
          (<ModalWindow onCloseModal={() => setIsOpen(false)}>
            <Form titleText='Добавить партию' buttonText='Добавить' onSubmit={() => { }} onClose={() => setIsOpen(false)} onObjectsEdit={() => getMatches()}
              dataType='Match' className='bg-form' postUrl='http://localhost:3000/matches'>
              <input name='gameName' type="text" placeholder='Название игры' />
              <input name='winnerName' type="text" placeholder='Победитель' />
              <input name='playersNames' type="text" placeholder='Список игроков' />
            </Form>
          </ModalWindow>) : (<div></div>)
        }
      </section>
      <footer>
      </footer>
    </>
  )
}

export default Stats