import { useState, useEffect } from 'react'
import axios from 'axios'
import { GamePreviewCard } from '../GameCard/GameCard'
import type { BoardGame } from '../GameCard/GameCard'
import '../GameCard/GameCard.css' 

interface BoardGameListProps{
    className?: string; 
}

export const BoardGameList = (props: BoardGameListProps) => {
    const [boardGames, setBoardGames] = useState<BoardGame[]>()

    useEffect(() => { 
        async function getObjects() {
            const response = await axios.get('http://localhost:3000/bg-objects')
            const objects = await response.data
            setBoardGames(objects)
            console.log('1');
        }

        getObjects() 
    }, []) 
    
    return (<div className={props.className}>
        {boardGames? (
            boardGames.map(obj => (
                <GamePreviewCard className="bg-preview-card shadow-effect" 
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