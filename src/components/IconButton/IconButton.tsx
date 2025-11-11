import './IconButton.css'

interface IconButtonProps{
    iconUrl: string;
    text?: string; 
}

export const IconButton = (props: IconButtonProps, ) => {
    return (
        <div className="iconBtn">  
            <p>{props.text}</p>
            <img src={props.iconUrl} />
        </div>
    )
}