import './Players.css'
import { DropMenu } from '../components/DropMenu/DropMenu'
import { IconButton } from '../components/IconButton/IconButton'
import { Form } from '../components/Form/Form'
import { ModalWindow } from '../components/ModalWindow/ModalWindow'
import { PlayersList, type Player } from '../components/PlayersList/PlayersList'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Players() {
  const [isOpen, setIsOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>()
  
  const getPlayers = () => {
    axios.get('http://localhost:3000/players')
      .then(response => { 
        setPlayers(response.data)
        console.log('Игроки загружены');
      })
      .catch(error => console.log(error.message));
      
  }
  
  useEffect(() => { 
    getPlayers()
  }, []) 

  return (
    <>
      <header>
        <div className='container header-items'>
          <img className='logo' src='/images/logo.png'/>
          <h1>Список игроков</h1>
          <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
        </div>
      </header>
      <div className='operation-btns container'>
              <IconButton className='shadow-effect' onClick={() => {}} text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton>
              <IconButton className='shadow-effect' onClick={() => setIsOpen(true)} text='Добавить' iconUrl='/images/plus.svg'></IconButton>
      </div>
      <section className='players-block container'>
        <PlayersList players={players}></PlayersList>
        { isOpen? 
          (<ModalWindow onCloseModal={() => setIsOpen(false)}>
            <Form titleText='Добавить игрока' buttonText='Добавить' onSubmit={() => {}} onClose={() => setIsOpen(false)} onObjectsEdit={() => getPlayers()}
            dataType='Player' className='bg-form' postUrl='http://localhost:3000/players'>
              <input name='name' type="text" placeholder='Имя игрока'/>
            </Form>
          </ModalWindow>) : (<div></div>)
        }
      </section>
      <footer>
      </footer> 
    </>
  )
}

export default Players