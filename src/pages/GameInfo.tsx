import { useLocation } from "react-router"
import type {BoardGame} from "../components/GameCard/GameCard"
import { GameInfoCard } from "../components/GameInfoCard/GameInfoCard"
import { DropMenu } from '../components/DropMenu/DropMenu'
import './GameInfo.css'

function GameInfo() {
    const location = useLocation()
    const obj = location.state.game as BoardGame

    return (
        <>
            <header className="no-header">
                <div className='container'>
                    <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
                </div>
            </header>
            <GameInfoCard id={obj.id} 
                name={obj.name} 
                genre={obj.genre}
                players={obj.players}
                avgTimeInMinutes={obj.avgTimeInMinutes} 
                imageUrl={obj.imageUrl}
                description={obj.description}  
                owner={obj.owner}
                priceInRubles={obj.priceInRubles}>
            </GameInfoCard>
            <footer></footer>
        </>
        
    )
}

export default GameInfo