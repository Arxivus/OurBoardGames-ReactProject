import './DropMenu.css'
import { Link, Route } from 'react-router';

interface DropMenuProps {
    tabs: Array<string>;
    routsName: Array<string>;
    className?: string;
}

export const DropMenu = (props: DropMenuProps) => {
    return (
        <div className="dropMenu">
            {props.tabs.map((tabName, index) =>
                <Link to={props.routsName[index]} key={index} className="dropMenu-item">{tabName}</Link>
            )}
        </div>
    )
}