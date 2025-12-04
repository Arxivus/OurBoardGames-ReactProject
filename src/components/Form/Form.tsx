import type { FormEvent } from "react";
import type { BoardGame } from "../GameCard/GameCard";
import axios from 'axios'
import "./Form.css"

export type FormProps = {
    actionType?: 'POST' | 'GET';
    className?: string;
    buttonText: string;
    titleText: string;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function handleFormSubmit(event: FormEvent) { 
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
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

    
    /*axios.post('http://localhost:3000/bg-objects', gameData)*/
  
    console.log(gameData);

}



export const Form = ( props: FormProps) => {

    return <form onSubmit={handleFormSubmit} action={props.actionType} className={props.className}>
        <h2>{props.titleText}</h2>
        {props.children}
        <button className="form-btn iconBtn" type="submit">{props.buttonText}</button>
    </form>
}