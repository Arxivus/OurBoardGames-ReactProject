import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'
import { type SelectOption, type Match } from '../types/types'

interface DataContextType {
  genresList: SelectOption[]
  playersList: SelectOption[]
  matchesList: Match[]
  loading: boolean
  error: string | null
  refreshGenres: () => Promise<void>
  refreshPlayers: () => Promise<void>
  refreshMatches: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {

  const [genresList, setGenresList] = useState<SelectOption[]>([{ value: "", label: "Все категории" }])
  const [playersList, setPlayersList] = useState<SelectOption[]>([])
  const [matchesList, setMatchesList] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = 'http://localhost:3001/api/games'

  const refreshGenres = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_URL}/genres`)
      setGenresList(response.data)

    } catch (err: any) {
      console.error(err)
      setError(err.message)

    } finally {
      setLoading(false)
    }
  }

  const refreshPlayers = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_URL}/players`)
      setPlayersList(response.data)

    } catch (err: any) {
      console.error(err)
      setError(err.message)
      
    } finally {
      setLoading(false)
    }
  }

  const refreshMatches = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_URL}/matches`)
      console.log(response.data);
      setMatchesList(response.data)

    } catch (err: any) {
      console.error(err)
      setError(err.message)
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshGenres()
    refreshPlayers()
    refreshMatches()
  }, [])

  return (
    <DataContext.Provider value={{
      genresList,
      playersList,
      matchesList,
      loading,
      error,
      refreshGenres,
      refreshPlayers,
      refreshMatches
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