import { useNavigate } from 'react-router'
import { type BoardGame } from '../../types/types'


export const GamePreviewCard = ( props: BoardGame ) => {

    const navigate = useNavigate()
    const handleGameCardClick = (game: BoardGame) => {
        navigate(`/${game.id}`, {
            state: {game}
        })
    }

    return (<li key={props.id} className={props.className} onClick={() => handleGameCardClick(props)}>
        <img className='bg-preview-img' src={props.imageUrl} alt="Изображение игры" />
        <div className='bg-preview-descr'>
            <h2 className='bg-preview-name'>{props.name}</h2>
            <div className='bg-preview-info'>
                <div className='bg-preview-info-genres'>
                    {props.genre? (props.genre.map((item, index) => (<p key={index}><b>{item}</b></p>))) : (<i>Жанр не указан</i>)}
                </div>
                <p className='bg-preview-info-time'>
                    <img src="/images/hourglass.png" alt="" />
                    <b>{props.avgTimeInMinutes}</b>
                </p>
            </div>
        </div>
        
    </li>)
}

