import React from 'react'
import './card.css'

type CardProps = {
    title?: string;
    shape?: string;
    label?: string;
};

const Card: React.FC<CardProps> = ({ title, shape, label }) => {
  return (
    <div className='card_container'>
        {title ? title : ''}
        {shape && (
            <div>
                eiei
            </div>
        )}
        {label && (
        <>
        </>
        )}
    </div>

  )
}

export default Card