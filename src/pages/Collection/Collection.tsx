import './Collection.css'
import type { BoardGame } from '../../components/GameCard/GameCard'
import { BoardGameList } from '../../components/BoardGameList/BoardGameList'
import { IconButton } from '../../components/IconButton/IconButton'
import { Header } from '../../components/Header/Header'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { Form } from '../../components/Form/Form'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Select, { type SingleValue } from 'react-select'
import { selectStyles } from '../../constsnt/selectStyles'


type SelectOption = {
  value: string;
  label: string;
};


function Collection() {
  const [isOpen, setIsOpen] = useState(false);

  const [boardGames, setBoardGames] = useState<BoardGame[]>()
  const [genresList, setGenresList] = useState<SelectOption[]>([{ value: "", label: "Все категории" }])
  const [playersList, setPlayers] = useState<SelectOption[]>([])

  const [filters, setFilters] = useState({
        name: '',
        genre: '',
        price: [] as number[]
    });

  const API_URL = 'http://localhost:3001/api/games'

  // использовать контексты?
  const getBoardGames = () => {
    axios.get(API_URL)
      .then(response => {
        setBoardGames(response.data)
        console.log('Игры успешно загружены', response.data);
      })
      .catch(error => console.log(error.message));
  }

  const getGenres = () => {
    axios.get(`${API_URL}/genres`)
      .then(response => {
        setGenresList(response.data)
        console.log('Жанры успешно загружены');
      })
      .catch(error => console.log(error.message));
  }

  const getPlayers = () => {
    axios.get(`${API_URL}/players`)
      .then(response => {
        setPlayers(response.data)
        console.log('Игроки успешно загружены');
      })
      .catch(error => console.log(error.message));
  }

  useEffect(() => {
    getBoardGames()
    getGenres()
    getPlayers()
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
            postUrl={API_URL} dataType='BoardGame' className='bg-form' buttonText='Добавить' titleText='Добавление игры'>
            <input name='name' type="text" placeholder='Название' />
            <select name='genre'>
              <option value="Жанр" disabled selected hidden>Жанр</option>
              {genresList?.map(genre =>
                <option value={genre.value}>{genre.value}</option>
              )}
            </select>
            <input name='players' type="text" placeholder='Количество игроков *-*' />
            <input name='avgTimeInMinutes' type="number" placeholder='Среднее время партии (мин)' min={5} />
            <textarea name='description' placeholder='Описание' />
            <select name="owner">
              <option value="Владелец" disabled selected hidden>Владелец</option>
              {playersList?.map(player =>
                <option value={player.value}>{player.value}</option>
              )}
            </select>
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
