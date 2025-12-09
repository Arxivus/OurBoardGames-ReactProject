import './PlayersList.css'

export type Player = {
    id?: string;
    name: string;
    winsCount?: number;
}

interface PlayersListProps {
    players?: Array<Player>
}

export const PlayersList = (props: PlayersListProps) => {
   
    return (<div className="players-list">
        {props.players? (
            props.players.map(obj => (
                <div className="players-list-item shadow-effect" key={obj.id}>
                    <img className='players-icon' src="/images/playersIcon.png"/>
                    <p>{obj.name}</p>
                </div>
            ))
        ): (<p>Игроки не найдены....</p>) }
    </div>)
}