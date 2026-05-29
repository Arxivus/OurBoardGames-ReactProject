import './Players.css'
import { Header } from '../../components/Header/Header'
import { IconButton } from '../../components/IconButton/IconButton'
import { Form } from '../../components/Form/Form'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { PlayersList } from '../../components/PlayersList/PlayersList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../contexts/DataContext'


function Players() {
  const [isOpen, setIsOpen] = useState(false);
  const [players, setPlayers] = useState<[]>()

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const getPlayers = () => {
    axios.get(`${API_URL}/players`)
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
      <Header title='Список игроков'></Header>
      <div className='operation-btns container'>
        {/* <IconButton className='shadow-effect' onClick={handleOpenModal} text='Добавить'></IconButton> */}
      </div>
      <section className='players-block container'>
        <PlayersList players={players}></PlayersList>
        {isOpen ?
          (<ModalWindow onClose={handleCloseModal}>
            <Form titleText='Добавить игрока' buttonText='Добавить' onSubmit={() => { }} onClose={() => setIsOpen(false)} onObjectsEdit={() => getPlayers()}
              dataType='Player' className='bg-form' postUrl='http://localhost:3000/players'>
              <input name='name' type="text" placeholder='Имя игрока' />
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