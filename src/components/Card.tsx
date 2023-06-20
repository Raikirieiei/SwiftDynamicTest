import React from 'react'
import './card.css'
import './shape.css'

type CardProps = {
    title?: string;
    shape?: string | string[];
    label?: string;
    onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ title, shape, label, onClick }) => {
    return (
        <div className='card_container' onClick={onClick}>
            {title ? title : ''}
            {shape &&
                (Array.isArray(shape) ? (
                    <div style={{display: 'flex', gap: '12vw'}}>
                        {shape.map((item, index) => (
                            <span key={index} className={item}></span>
                        ))}
                    </div>
                ) : (
                    <span className={shape}></span>
                ))}
            {label && (
                
                <div className='label_tag'>
                    {label}
                </div>
        
            )}
        </div>

    )
}

export default Card