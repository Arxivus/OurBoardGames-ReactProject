import type { FormEvent } from "react";
import type { BoardGame } from "../GameCard/GameCard";
import axios from 'axios'
import "./Form.css"
import type { Player } from "../PlayersList/PlayersList";

export type FormProps = {
    actionType?: 'POST' | 'GET';
    postUrl: string;
    dataType: 'BoardGame' | 'Player';
    className?: string;
    buttonText: string;
    titleText: string;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose?: () => void;
    onObjectsEdit?: () => void;
}

function isBoardGameValid(formData: FormData) {
    if (1 == 1) {
        return true
    }  
}

function isPlayerValid(formData: FormData) {
    if (1 == 1) {
        return true
    }  
}

function generateGameObject(formData: FormData) {
    const genres = formData.get('genre') as string
    const gameData: BoardGame  = {
        name: formData.get('name') as string,
        genre: genres.split(',').map(item => item.trim()),
        players: formData.get('name') as string,
        avgTimeInMinutes: formData.get('avgTimeInMinutes') as string,
        imageUrl: "/images/noimage.png",
        description: formData.get('description') as string,
        owner: formData.get('owner') as string,
        priceInRubles: Number(formData.get('priceInRubles'))
    };
    return gameData
}

function generatePlayerObject(formData: FormData) {
    const playerData: Player = {
        name: formData.get('name') as string,
    }
    return playerData
}

export const Form = ( props: FormProps) => {

    const handleFormSubmit = (event: FormEvent) => { 
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        let object = null
        
        switch (props.dataType) {
        case 'BoardGame':
            if (isBoardGameValid(formData)) { object = generateGameObject(formData) }
            break;
            
        case 'Player':
            if (isPlayerValid(formData)) { object = generatePlayerObject(formData) }
            break;
        }
        
        if (object != null) {
            axios.post(props.postUrl, object)
            .then(() => {
                console.log('Добавлено')
                props.onObjectsEdit?.()
                props.onClose?.()
            })
            .catch(error => console.log(error.message))
        }   
    }

    return <form onSubmit={handleFormSubmit} action={props.actionType} className={props.className}>
        <h2>{props.titleText}</h2>
        {props.children}
        <button className="form-btn iconBtn" type="submit">{props.buttonText}</button>
    </form>
}