import type { FC } from 'react'


interface ComponentProps {
    className?: string;
    name: string;
    genre: string;
    avgPlayTime?: string;
    imageUrl?: string;
    description?: string;
    ownerName?: string;
    purchasePrice?: number;
}

export const GameCard: FC<ComponentProps> = ( { className, name, genre, avgPlayTime, imageUrl, description, ownerName, purchasePrice } ) => {

    return (<div className={className}>
        <img className='bg-img' src={imageUrl} alt="Изображение игры" />
        <h2>{name}</h2>
        <div>
            <p>Жанр: <b>{genre}</b></p>
            <p>Среднее время партии: <b>{avgPlayTime}</b></p>
            <p>Краткое описание: {description}</p>
            <p>Владелец коробки: <b>{ownerName}</b></p>
            <p>Цена покупки: <b>{purchasePrice}</b></p>
        </div>
    </div>)
}

export const GamePreviewCard: FC<ComponentProps> = ( { className, name, genre, avgPlayTime, imageUrl } ) => {

    return (<div className={className}>
        <img className='bg-preview-img' src={imageUrl} alt="Изображение игры" />
        <h2 className='bg-preview-name'>{name}</h2>
        <div className='bg-preview-info'>
            <p><b>{genre}</b></p>
            <p className='bg-preview-info-time'>
                <img src="/images/hourglass.png" alt="" />
                <b>{avgPlayTime}</b>
            </p>
        </div>
    </div>)
}

