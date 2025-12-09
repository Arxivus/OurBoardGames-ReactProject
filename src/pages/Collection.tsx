import './Collection.css'
import type { BoardGame } from '../components/GameCard/GameCard'
import { BoardGameList } from '../components/BoardGameList/BoardGameList'
import { IconButton } from '../components/IconButton/IconButton'
import { DropMenu } from '../components/DropMenu/DropMenu'
import { ModalWindow } from '../components/ModalWindow/ModalWindow'
import { Form } from '../components/Form/Form'
import { useState, useEffect } from 'react'
import axios from 'axios'

// npx json-server db.json - запуск сервера


function Collection() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardGames, setBoardGames] = useState<BoardGame[]>()
  
  const getBoardGames = () => {
    axios.get('http://localhost:3000/bg-objects')
      .then(response => (setBoardGames(response.data)))
      .catch(error => console.log(error.message));
      console.log('Загружено');
  }
  
  useEffect(() => { 
    getBoardGames()
  }, []) 

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
        <IconButton className='shadow-effect' onClick={() => {}} text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton>
        <IconButton className='shadow-effect' onClick={() => setIsOpen(true)} text='Добавить' iconUrl='/images/plus.svg'></IconButton>
      </div>
      <BoardGameList boardGames={boardGames} className='bg-library-block container'></BoardGameList>
      { isOpen? 
        (<ModalWindow onCloseModal={() => setIsOpen(false)}>
          <Form onSubmit={() => {}} onClose={() => setIsOpen(false)} onObjectsEdit={() => getBoardGames()} className='bg-form' buttonText='Добавить'  titleText='Добавление игры'>
            <input name='name' type="text" placeholder='Название'/>
            <select name='genre'>
              <option value="Жанр" disabled selected hidden>Жанр</option>
              <option value="Стратегия">Стратегия</option>
              <option value="Семейная">Семейная</option>
              <option value="Евро">Евро</option>
              <option value="Аукцион">Аукцион</option>
              <option value="Контроль территории">Контроль территории</option>
              <option value="Для компании">Для компании</option>
              <option value="Кооператив">Кооператив</option>
              <option value="Карточная">Карточная</option>
              <option value="Ассоциации">Ассоциации</option>
            </select>
            <input name='players' type="text" placeholder='Количество игроков *-*'/>
            <input name='avgTimeInMinutes' type="number" placeholder='Среднее время партии (мин)' min={5}/>
            <textarea placeholder='Описание'/>
            <input name='owner' type="text" placeholder='Владелец'/>
            <input name='priceInRubles' type="number" placeholder='Средняя цена' min={100} max={100000}/>
          </Form>
        </ModalWindow>) 
        : (<div></div>)}
      <footer>
      </footer> 
    </>
  )
}

export default Collection
