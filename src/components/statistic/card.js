import React, { useEffect, useRef, useState } from 'react'
import './card.less'
import { Progress } from 'antd'
export default function Card(props) {
    const { cardInfo, bigger } = props
    const [diagramBigger, setDiagramBigger] = useState(false);
    const cardRef = useRef(null);
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleResize = () => {
        if (cardRef.current) {
            setDiagramBigger(cardRef.current.offsetWidth > 145);
        }
    }
    const { title, number, percentage } = cardInfo
    return (
        <div className='card'>
            <div className='cardLeft'>
                <div className='title'>{title}</div>
                <div className='number'>{number}</div>
                <div className='percentage'>{percentage} inc</div>
            </div>
            <div ref={cardRef} className='cardRight'>
                <Progress
                    className='diagram'
                    type="circle"
                    percent={percentage}
                    strokeWidth={10}
                    size={diagramBigger ? 'default' : 'small'}
                />
            </div>
        </div>
    )
}
