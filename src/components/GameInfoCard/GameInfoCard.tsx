import './GameInfoCard.css'
import type { BoardGame } from '../GameCard/GameCard'

// route по /:id с рендером навигации и карточки этой
export const GameInfoCard = (props: BoardGame) => {
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
                    <p>{props.description}</p>
                    <span>Владелец: <b>{props.owner}</b></span>
                </div>
            </div>
        </div>
    )
} 