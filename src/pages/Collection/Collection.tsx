import { useState, useEffect, useMemo } from 'react'
import './Collection.css'
import axios from 'axios'
import { type SingleValue } from 'react-select'
import Select from 'react-select'
import { selectStyles } from '../../constsnt/selectStyles'
import { maxTimeOptions } from '../../constsnt/selectOptions'
import { Header } from '../../components/Header/Header'
import { IconButton } from '../../components/IconButton/IconButton'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import { GameForm } from '../../components/GameForm/GameForm'
import { BoardGameList } from '../../components/BoardGameList/BoardGameList'
import { type BoardGame } from '../../types/types'
import { useData } from '../../contexts/DataContext'
import { API_URL } from '../../contexts/DataContext'


function Collection() {
  const [isOpen, setIsOpen] = useState(false)
  const [boardGames, setBoardGames] = useState<BoardGame[]>([])
  const { genresList, playersList, refreshData } = useData()

  const [filters, setFilters] = useState({
    genre: '',
    time: Infinity,
    price: [] as number[]
  })



  const getBoardGames = () => {
    axios.get(API_URL)
      .then(response => {
        setBoardGames(response.data)
      })
      .catch(error => console.log(error.message))
  }

  useEffect(() => {
    getBoardGames()
    refreshData('genres')
    refreshData('players')
  }, [])

  const handleGenreChange = (genre: SingleValue<{ value: string; label: string }>) => {
    setFilters(prev => ({ ...prev, genre: genre?.value || '' }))
  }

  const handleTimeChange = (avgTimeInMinutes: SingleValue<{ value: number; label: string }>) => {
    setFilters(prev => ({ ...prev, time: avgTimeInMinutes?.value || Infinity }))
  }

  const filteredCards = useMemo(() => {
    if (!boardGames) return []
    return boardGames.filter(game => {
      const genre = !filters.genre || game.genre.join(',').includes(filters.genre)
      const time = !filters.time || Number(game.avgTimeInMinutes) < filters.time 

      return genre && time
    }
      
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
          placeholder={'Фильтр по жанрам'}
          onChange={handleGenreChange}
        />
        <Select
          styles={selectStyles}
          options={maxTimeOptions}
          placeholder={'Фильтр по времени'}
          onChange={handleTimeChange}
        />
        <IconButton className='shadow-effect' onClick={handleOpenModal} text='Добавить игру' />
      </div>

      { filteredCards.length != 0 ? (
        <BoardGameList boardGames={filteredCards} className='bg-library-block container' />
      ) : (
        <div className='container'>Игры не найдены...</div>
      )
      }

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