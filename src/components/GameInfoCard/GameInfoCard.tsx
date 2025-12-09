import './GameInfoCard.css'
import type { BoardGame } from '../GameCard/GameCard'
import axios from 'axios'
import { useNavigate } from 'react-router'


export const GameInfoCard = (props: BoardGame) => {

    const navigate = useNavigate()
    function deleteGame() {
        axios.delete(`http://localhost:3000/bg-objects/${props.id}`)
        .then(() => {
            navigate(-1)
        })
        .catch(error => console.log(error.message))
        
    }

    return (
        <div className='container'>
            <div className='gameInfoCard'>
                <img className='shadow-effect' src={props.imageUrl}/>
                <div className='gameInfo shadow-effect'>
                    <div className='gameInfo-title'>
                        <h2>{props.name}</h2>
                        <div className='line'></div>
                    </div>
                    <div className='gameInfo-params'>
                        <span>Длительность: <b>{props.avgTimeInMinutes} минут</b></span>
                        <span>Цена: <b>{props.priceInRubles} рублей</b></span>
                    </div>
                    <div className='gameInfo-params colored'>
                        <span>Жанр: 
                            <b> {props.genre.length > 1 ? (props.genre.join(', ')) : (props.genre) }</b>
                        </span>
                        <span>Кол-во игроков: <b>{props.players}</b></span>
                    </div>
                    <p className='gameInfo-descr'>{props.description}</p>
                    <div className='gameInfo-extra-block'>
                        <span>Владелец: <b>{props.owner}</b></span>
                        <button onClick={deleteGame} className='game-delete-btn'><b><p>Удалить игру</p></b></button>
                    </div>
                </div>
            </div>
        </div>
    )
} 