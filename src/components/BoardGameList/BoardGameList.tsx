import { GamePreviewCard } from '../GameCard/GameCard'
import type { BoardGame } from '../GameCard/GameCard'
import '../GameCard/GameCard.css' 

interface BoardGameListProps{
    className?: string;
    boardGames?: Array<BoardGame> 
}

export const BoardGameList = (props: BoardGameListProps) => {
   
    return (<div className={props.className}>
        {props.boardGames? (
            props.boardGames.map(obj => (
                <GamePreviewCard key={obj.id} className="bg-preview-card shadow-effect" 
                    id={obj.id} 
                    name={obj.name} 
                    genre={obj.genre}
                    players={obj.players}
                    avgTimeInMinutes={obj.avgTimeInMinutes} 
                    imageUrl={obj.imageUrl}
                    description={obj.description}  
                    owner={obj.owner}
                    priceInRubles={obj.priceInRubles}>   
                </GamePreviewCard>
            ))
        ): (<p>Ooooopsss....</p>) }
    </div>)
}