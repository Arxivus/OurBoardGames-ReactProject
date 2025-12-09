import './MatchesList.css'

export type Match = {
    id?: string;
    gameName: string;
    winnerName: string;
    playersNames: Array<string>;
}

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
                        {obj.playersNames? (obj.playersNames.map((item, index) => (<p key={index}>{item}, </p>))) : (<i>Нет игроков</i>)}
                    </div>  
                </div>
            ))
        ): (<p>Партии не найдены....</p>) }
    </div>)
}