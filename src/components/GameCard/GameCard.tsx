import type { FC } from 'react'


export type BoardGame = {
    id?: number;
    className?: string;
    name: string;
    genre: Array<string>;
    players?: string;
    avgTimeInMinutes?: string;
    imageUrl?: string;
    description?: string;
    owner?: string;
    priceInRubles?: number;
}

export const GameCard: FC<BoardGame> = ( { className, name, genre, avgTimeInMinutes, imageUrl, description, owner, priceInRubles } ) => {

    return (<div className={className}>
        <img className='bg-img' src={imageUrl} alt="Изображение игры" />
        <h2>{name}</h2>
        <div>
            <p>Жанр: <b>{genre}</b></p>
            <p>Среднее время партии: <b>{avgTimeInMinutes}</b></p>
            <p>Краткое описание: {description}</p>
            <p>Владелец коробки: <b>{owner}</b></p>
            <p>Цена покупки: <b>{priceInRubles}</b></p>
        </div>
    </div>)
}

export const GamePreviewCard: FC<BoardGame> = ( { className, name, genre, avgTimeInMinutes, imageUrl } ) => {

    return (<div className={className}>
        <img className='bg-preview-img' src={imageUrl} alt="Изображение игры" />
        <div className='bg-preview-descr'>
            <h2 className='bg-preview-name'>{name}</h2>
            <div className='bg-preview-info'>
                <div className='bg-preview-info-genres'>
                    {genre? (genre.map(item => (<p><b>{item}</b></p>))) : (<p>Жанр не указан</p>)}
                </div>
                <p className='bg-preview-info-time'>
                    <img src="/images/hourglass.png" alt="" />
                    <b>{avgTimeInMinutes}</b>
                </p>
            </div>
        </div>
        
    </div>)
}

