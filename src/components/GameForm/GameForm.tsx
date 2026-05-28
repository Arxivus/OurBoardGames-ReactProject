import { useState, useEffect } from 'react'
import axios from 'axios'
import '../Form/Form.css'
import type { SelectOption } from '../../types/types'
import type { BoardGame } from '../../types/types'

interface AddGameFormProps {
  onClose: () => void
  onGameSubmitted?: () => void
  genresList: SelectOption[]
  playersList: SelectOption[]
  apiUrl: string
  game?: BoardGame  
  mode?: 'create' | 'edit'
}

interface GameFormData {
  name: string
  genre?: string
  players?: string
  avgTimeInMinutes?: string
  description?: string
  owner?: string
  priceInRubles?: number
  imageUrl?: string
}

export const GameForm = ({ 
  onClose, 
  onGameSubmitted, 
  genresList, 
  playersList, 
  apiUrl, 
  game,
  mode = 'create'
}: AddGameFormProps) => {
  
  const [formData, setFormData] = useState<GameFormData>({
    name: '',
    genre: '',
    players: '',
    avgTimeInMinutes: '',
    description: '',
    owner: '',
    priceInRubles: undefined,
    imageUrl: '/images/noimage.png'
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (game && mode === 'edit') {
      setFormData({
        name: game.name,
        genre: game.genre[0] || '',
        players: game.players,
        avgTimeInMinutes: game.avgTimeInMinutes,
        description: game.description || '',
        owner: game.owner,
        priceInRubles: game.priceInRubles,
        imageUrl: game.imageUrl || '/images/noimage.png'
      })
    }
  }, [game, mode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'avgTimeInMinutes' || name === 'priceInRubles' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (mode === 'edit' && game) {
        const response = await axios.patch(`${apiUrl}/${game.id}`, formData)
        console.log('Игра успешно обновлена:', response.data)

      } else {
        const response = await axios.post(apiUrl, formData)
        console.log('Игра успешно добавлена:', response.data)
      }
      
      onGameSubmitted?.()
      onClose()

    } catch (error: any) {
      console.error(error)
      setError(error.response?.data?.error || `Ошибка при ${mode === 'edit' ? 'обновлении' : 'добавлении'} игры`)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-form'>
      <h2>{mode === 'edit' ? 'Редактирование' : 'Добавление игры'}</h2>
      
      {error && <div className='error-message'>{error}</div>}

      <input
        name='name'
        type='text'
        placeholder='Название'
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name='genre' value={formData.genre} onChange={handleChange} required>
        <option value='' disabled>Выберите жанр</option>
        {genresList.filter(g => g.value).map(genre => (
          <option key={genre.value} value={genre.value}>{genre.label}</option>
        ))}
      </select>

      <input
        name='players'
        type='text'
        placeholder='Количество игроков (1-4)'
        value={formData.players}
        onChange={handleChange}
        required
      />

      <input
        name='avgTimeInMinutes'
        type='number'
        placeholder='Среднее время партии (мин)'
        min={5}
        value={formData.avgTimeInMinutes}
        onChange={handleChange}
        required
      />

      <textarea
        name='description'
        placeholder='Описание'
        value={formData.description}
        onChange={handleChange}
      />

      <select name='owner' value={formData.owner} onChange={handleChange} required>
        <option value='' disabled>Выберите владельца</option>
        {playersList.filter(p => p.value).map(player => (
          <option key={player.value} value={player.value}>{player.label}</option>
        ))}
      </select>

      <input
        name='priceInRubles'
        type='number'
        placeholder='Средняя цена'
        min={100}
        max={100000}
        value={formData.priceInRubles}
        onChange={handleChange}
        required
      />

      <div className='form-btn'>
        <button type='submit' disabled={isLoading}>
          {isLoading 
            ? 'Сохранение...' 
            : mode === 'edit' ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}