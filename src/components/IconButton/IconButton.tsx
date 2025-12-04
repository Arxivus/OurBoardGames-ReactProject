import './IconButton.css'

export type IconButtonProps = {
    iconUrl: string;
    text?: string;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void; 
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <div onClick={props.onClick} className={`iconBtn ${props.className}`}>  
            <p>{props.text}</p>
            <img src={props.iconUrl} />
        </div>
    )
}