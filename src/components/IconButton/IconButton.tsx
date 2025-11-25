import './IconButton.css'

export type IconButtonProps = {
    iconUrl: string;
    text?: string;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <button onClick={props.onClick} className={props.className}>  
            <p>{props.text}</p>
            <img src={props.iconUrl} />
        </button>
    )
}