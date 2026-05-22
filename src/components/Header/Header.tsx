import './Header.css'
import { DropMenu } from "../DropMenu/DropMenu"

interface Headerprops {
    title: string;
}

export const Header = (props: Headerprops) => {
    return (
        <header>
            <div className='container header-items'>
                <img className='logo' src='/images/logo.png' />
                <h1>{props.title}</h1>
                <DropMenu tabs={['Коллекция', 'Статистика', 'Игроки']} routsName={['/', '/stats', '/players']}></DropMenu>
            </div>
        </header>
    )
}