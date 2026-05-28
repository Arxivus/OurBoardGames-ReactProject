import './GameInfoCard.css'
import { useEffect, useState } from 'react'
import { type BoardGame } from '../../types/types'
import { GameForm } from '../GameForm/GameForm'
import { ModalWindow } from '../ModalWindow/ModalWindow'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useData } from '../../contexts/DataContext'


export const GameInfoCard = (props: BoardGame) => {

    const [isOpen, setIsOpen] = useState(false)
    const [game, setGame] = useState<BoardGame>(props)
    const { genresList, playersList } = useData()
    const navigate = useNavigate()

    const API_URL = 'http://localhost:3001/api/games'

    const handleOpenModal = () => setIsOpen(true)
    const handleCloseModal = () => setIsOpen(false)

    const handleGameSubmitted = async () => {
        try {
            const response = await axios.get(`${API_URL}/${game.id}`)
            const updatedGame = response.data

            setGame(updatedGame)

        } catch (error) {
            console.error('Ошибка получения обновлённой игры:', error)
        }
    }

    const deleteGame = () => {
        axios.delete(`${API_URL}/${game.id}`)
            .then((response) => {
                console.log(response.data.message)
                navigate(-1)
            })
            .catch(error => console.log(error.message))

    }

    return (
        <div className='container'>
            <div className='gameInfoCard'>
                <img className='shadow-effect' src={game.imageUrl} />
                <div className='gameInfo shadow-effect'>
                    <div className='gameInfo-title'>
                        <h2>{game.name}</h2>
                        <div className='line'></div>
                    </div>
                    <div className='gameInfo-params'>
                        <span>Длительность: <b>{game.avgTimeInMinutes} минут</b></span>
                        <span>Цена: <b>{game.priceInRubles} рублей</b></span>
                    </div>
                    <div className='gameInfo-params colored'>
                        <span>Жанр:
                            <b> {game.genre.length > 1 ? (game.genre.join(', ')) : (game.genre)}</b>
                        </span>
                        <span>Кол-во игроков: <b>{game.players}</b></span>
                    </div>
                    <p className='gameInfo-descr'>{game.description}</p>
                    <div className='gameInfo-extra-block'>
                        <span>Владелец: <b>{game.owner}</b></span>
                        <div className='gameInfo-btns'>
                            <button onClick={handleOpenModal} className='game-edit-btn'><b><p>Редактировать</p></b></button>
                            <button onClick={deleteGame} className='game-delete-btn'><b><p>Удалить игру</p></b></button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <ModalWindow onClose={handleCloseModal}>
                    <GameForm
                        onClose={handleCloseModal}
                        game={game}
                        genresList={genresList}
                        playersList={playersList}
                        apiUrl={API_URL}
                        mode={'edit'}
                        onGameSubmitted={handleGameSubmitted}
                    />
                </ModalWindow>
            )}
        </div>
    )
} 