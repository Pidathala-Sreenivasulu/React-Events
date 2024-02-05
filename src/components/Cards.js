import React from 'react'
import './styles/cards.scss';

const CardsComponent = (props) => {
    const {
        title = '',
        subTitle = '',
        price = 0,
        image = '',
        linkLabel = '',
        onLinkAction = () => { },
        onClick = () => { },
        selectedCard = '',
        location = ''
    } = props;

    return (
        <div className='card-component-container'>
            <div className='card-component-item' onClick={() => onClick(selectedCard)}>
                <img className='card-primary-image' src={image} alt='' />
                <div className='card-title'>{title}</div>
                <div className='card-sub-title'>{subTitle}</div>
                <div className='card-price-location'>
                    <div className='card-price'>{price}</div>
                    <div className='card-location'>{location}</div>
                </div>
                <div className='card-hyper-link' onClick={(e) => {
                    e.stopPropagation()
                    onLinkAction(selectedCard)
                }}> {linkLabel}
                </div>
            </div>
        </div>
    )
}

export default CardsComponent