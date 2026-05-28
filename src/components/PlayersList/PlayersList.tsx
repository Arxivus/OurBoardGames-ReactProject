import './PlayersList.css'

/* export type Player = {
    id?: string;
    name: string;
    winsCount?: number;
} */

type SelectOption = {
  value: string;
  label: string;
};

interface PlayersListProps {
    players?: Array<SelectOption>
}

export const PlayersList = (props: PlayersListProps) => {
   
    return (<div className="players-list">
        {props.players? (
            props.players.map((obj, index) => (
                <div className="players-list-item shadow-effect" key={index}>
                    <img className='players-icon' src="/images/playersIcon.png"/>
                    <p>{obj.label}</p>
                </div>
            ))
        ): (<p>Игроки не найдены....</p>) }
    </div>)
}