import './Collection.css'
import type { BoardGame } from '../../components/GameCard/GameCard'
import { BoardGameList } from '../../components/BoardGameList/BoardGameList'
import { IconButton } from '../../components/IconButton/IconButton'
import { Header } from '../../components/Header/Header'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { Form } from '../../components/Form/Form'
import { useState, useEffect } from 'react'
import axios from 'axios'

// npx json-server db.json - запуск сервера


function Collection() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardGames, setBoardGames] = useState<BoardGame[]>()
  
  const getBoardGames = () => {
    axios.get('http://localhost:3000/bg-objects')
      .then(response => {
        setBoardGames(response.data)
        console.log('Игры загружены');
      })
      .catch(error => console.log(error.message));
  }

  const genresList = [
    "Стратегия",
    "Семейная",
    "Евро",
    "Аукцион",
    "Контроль территории",
    "Для компании",
    "Кооператив",
    "Ассоциации",
    "Сбор сетов",
    "Скрытые перемещения"
  ]
  
  useEffect(() => { 
    getBoardGames()
  }, []) 

  return (
    <>
      <Header title='Наша коллекция'></Header>
      <div className='operation-btns container'>
        <IconButton className='shadow-effect' onClick={() => {}} text='Фильтровать' iconUrl='/images/arrow.svg'></IconButton>
        <IconButton className='shadow-effect' onClick={() => setIsOpen(true)} text='Добавить игру'></IconButton>
      </div>
      <BoardGameList boardGames={boardGames} className='bg-library-block container'></BoardGameList>
      { isOpen? 
        (<ModalWindow onCloseModal={() => setIsOpen(false)}>
          <Form onSubmit={() => {}} onClose={() => setIsOpen(false)} onObjectsEdit={() => getBoardGames()}
            postUrl='http://localhost:3000/bg-objects' dataType='BoardGame' className='bg-form' buttonText='Добавить'  titleText='Добавление игры'>
            <input name='name' type="text" placeholder='Название'/>
            <select name='genre'>
              <option value="Жанр" disabled selected hidden>Жанр</option>
              { genresList?.map(genre => 
                    <option value={genre}>{genre}</option>
              )}  
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
