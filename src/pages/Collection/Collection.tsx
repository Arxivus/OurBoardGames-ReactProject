import { useState, useEffect, useMemo } from 'react'
import './Collection.css'
import axios from 'axios'
import { type SingleValue } from 'react-select'
import Select from 'react-select'
import { selectStyles } from '../../constsnt/selectStyles'
import { Header } from '../../components/Header/Header'
import { IconButton } from '../../components/IconButton/IconButton'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { GameForm } from '../../components/GameForm/GameForm'
import { BoardGameList } from '../../components/BoardGameList/BoardGameList'
import { type BoardGame } from '../../types/types'
import { useData } from '../../contexts/DataContext'


function Collection() {
  const [isOpen, setIsOpen] = useState(false)
  const [boardGames, setBoardGames] = useState<BoardGame[]>([])
  const { genresList, playersList, refreshGenres, refreshPlayers } = useData()

  const [filters, setFilters] = useState({
    name: '',
    genre: '',
    price: [] as number[]
  })

  const API_URL = 'http://localhost:3001/api/games'

    const getBoardGames = () => {
    axios.get(API_URL)
      .then(response => {
        setBoardGames(response.data)
        console.log('Игры успешно загружены')
      })
      .catch(error => console.log(error.message))
  }

  useEffect(() => {
    getBoardGames()
    refreshGenres()
    refreshPlayers()
  }, [])

  const handleGenreChange = (genre: SingleValue<{ value: string; label: string }>) => {
    setFilters(prev => ({ ...prev, genre: genre?.value || '' }))
  }

  const filteredCards = useMemo(() => {
    if (!boardGames) return []
    return boardGames.filter(game =>
      (!filters.genre || game.genre.join(',').includes(filters.genre))
    )
  }, [boardGames, filters])

  const handleGameAdded = () => {
    getBoardGames()
  }

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return (
    <>
      <Header title='Наша коллекция' />

      <div className='operation-btns container'>
        <Select
        styles={selectStyles}
          options={genresList}
          placeholder={'Фильтровать'}
          onChange={handleGenreChange}
        />
        <IconButton className='shadow-effect' onClick={handleOpenModal} text='Добавить игру' />
      </div>

      <BoardGameList boardGames={filteredCards} className='bg-library-block container' />

      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>
          <GameForm
            onClose={handleCloseModal}
            onGameSubmitted={handleGameAdded}
            genresList={genresList}
            playersList={playersList}
            apiUrl={API_URL}
          />
        </ModalWindow>
      )}

      <footer></footer>
    </>
  )
}

export default Collection