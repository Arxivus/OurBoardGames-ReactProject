import './MatchesList.css'
import { type Match } from '../../types/types'

interface MatchesListProps {
    matches?: Array<Match>
}

export const MatchesList = (props: MatchesListProps) => {
    return (<div className="matches-list">
        {props.matches? (
            props.matches.map(obj => (
                <div className="matches-list-item shadow-effect" key={obj.id}>
                    <div className="match-game">Игра: <b>{obj.gameName}</b></div>
                    <div className="match-winner">
                        <img src='/images/cup.png'></img>
                        {obj.winnerName}
                    </div>
                    <div className="match-players">
                        <img src='/images/group-icon.png'></img>
                        {obj.players? (obj.players.join(', ')) : (<i>Нет игроков</i>)}
                    </div>  
                </div>
            ))
        ): (<p>Партии не найдены....</p>) }
    </div>)
}