import './Collection.css'
import type { BoardGame } from '../../components/GameCard/GameCard'
import { BoardGameList } from '../../components/BoardGameList/BoardGameList'
import { IconButton } from '../../components/IconButton/IconButton'
import { Header } from '../../components/Header/Header'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { Form } from '../../components/Form/Form'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Select, { type SingleValue } from 'react-select';
import { selectStyles } from '../../constsnt/selectStyles'

// npx json-server db.json - запуск сервера
type SelectOption = {
  value: string;
  label: string;
};

const genresList = [
  { value: "", label: "Все категории" },
  { value: "Стратегия", label: "Стратегия" },
  { value: "Семейная", label: "Семейная" },
  { value: "Евро", label: "Евро" },
  { value: "Аукцион", label: "Аукцион" },
  { value: "Контроль территории", label: "Контроль территории" },
  { value: "Сбор сетов", label: "Сбор сетов" },
  { value: "Скрытые перемещения", label: "Скрытые перемещения" },
]


function Collection() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardGames, setBoardGames] = useState<BoardGame[]>()
  const [filters, setFilters] = useState({
        name: '',
        genre: '',
        price: [] as number[]
    });

  const getBoardGames = () => {
    axios.get('http://localhost:3000/bg-objects')
      .then(response => {
        setBoardGames(response.data)
        console.log('Игры загружены');
      })
      .catch(error => console.log(error.message));
  }

  useEffect(() => {
    getBoardGames()
  }, [])

  const handleGenreChange = (genre: SingleValue<SelectOption>) => {
      setFilters(prev => ({ ...prev, genre: genre?.value || '' }))
  };

  const filteredCards = useMemo(() => {
        if (!boardGames) return []
        return boardGames.filter(game =>
            (!filters.genre || game.genre.join(',').includes(filters.genre))
        )
    }, [boardGames, filters])

  

  return (
    <>
      <Header title='Наша коллекция'></Header>

      <div className='operation-btns container'>
        <Select
          options={genresList}
          styles={selectStyles}
          placeholder={'Фильтровать'}
          onChange={handleGenreChange}
        ></Select>
        <IconButton className='shadow-effect' onClick={() => setIsOpen(true)} text='Добавить игру'></IconButton>
      </div>

      <BoardGameList boardGames={filteredCards} className='bg-library-block container'></BoardGameList>
      {isOpen ?
        (<ModalWindow onCloseModal={() => setIsOpen(false)}>
          <Form onSubmit={() => { }} onClose={() => setIsOpen(false)} onObjectsEdit={() => getBoardGames()}
            postUrl='http://localhost:3000/bg-objects' dataType='BoardGame' className='bg-form' buttonText='Добавить' titleText='Добавление игры'>
            <input name='name' type="text" placeholder='Название' />
            <select name='genre'>
              <option value="Жанр" disabled selected hidden>Жанр</option>
              {genresList?.map(genre =>
                <option value={genre.value}>{genre.value}</option>
              )}
            </select>
            <input name='players' type="text" placeholder='Количество игроков *-*' />
            <input name='avgTimeInMinutes' type="number" placeholder='Среднее время партии (мин)' min={5} />
            <textarea placeholder='Описание' />
            <input name='owner' type="text" placeholder='Владелец' />
            <input name='priceInRubles' type="number" placeholder='Средняя цена' min={100} max={100000} />
          </Form>
        </ModalWindow>)
        : (<div></div>)}
      <footer>
      </footer>
    </>
  )
}

export default Collection
