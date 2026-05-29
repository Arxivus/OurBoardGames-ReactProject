import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'
import { type SelectOption, type Match } from '../types/types'

type Endpoint = 'genres' | 'players' | 'matches'

interface DataContextType {
  genresList: SelectOption[]
  playersList: SelectOption[]
  matchesList: Match[]
  loading: boolean
  error: string | null
  refreshData: (endpoint: Endpoint) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)
export const API_URL = 'http://localhost:3001/api/games'

export const DataProvider = ({ children }: { children: ReactNode }) => {

  const [genresList, setGenresList] = useState<SelectOption[]>([{ value: "", label: "Все категории" }])
  const [playersList, setPlayersList] = useState<SelectOption[]>([])
  const [matchesList, setMatchesList] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  const refreshData = async (endpoint: Endpoint): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${API_URL}/${endpoint}`)

      switch (endpoint) {
        case 'genres':
          setGenresList(response.data)
          break
        case 'players':
          setPlayersList(response.data)
          break
        case 'matches':
          setMatchesList(response.data)
          break
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData('genres')
    refreshData('players')
    refreshData('matches')
  }, [])

  return (
    <DataContext.Provider value={{
      genresList,
      playersList,
      matchesList,
      loading,
      error,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('Ошибка получения контекста')
  }
  return context
}