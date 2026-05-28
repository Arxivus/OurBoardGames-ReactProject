import './Stats.css'
import { Header } from '../../components/Header/Header'
import { Form } from '../../components/Form/Form'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { IconButton } from '../../components/IconButton/IconButton'
import { MatchesList } from '../../components/MatchesList/MatchesList'
import { useState } from 'react'
import { useData } from '../../contexts/DataContext'

function Stats() {
  const [isOpen, setIsOpen] = useState(false);
  const { playersList, matchesList } = useData()

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return (
    <>
      <Header title='Статистика'></Header>
      <div className='operation-btns container'>
        {/* <IconButton className='shadow-effect' onClick={() => { }} text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton> */}
        {/* <IconButton className='shadow-effect' onClick={handleOpenModal} text='Добавить партию'></IconButton> */}
      </div>
      <section className='container'>
        <MatchesList matches={matchesList}></MatchesList>
        {isOpen ?
          (<ModalWindow onClose={handleCloseModal}>
            <Form titleText='Добавить партию' buttonText='Добавить' onSubmit={() => { }} onClose={handleCloseModal}
              dataType='Match' className='bg-form' postUrl=''>
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