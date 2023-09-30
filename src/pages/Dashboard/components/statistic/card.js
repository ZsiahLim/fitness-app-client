import React, { useEffect, useRef, useState } from 'react'
import './card.less'
import { Progress } from 'antd'
export default function Card(props) {
    const { cardInfo } = props
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
        <div className='myCard'>
            <div className='myCardLeft'>
                <div className='myCardLeft-title'>{title}</div>
                <div className='myCardLeft-number'>{number}</div>
                <div className='myCardLeft-percentage'>{percentage} inc</div>
            </div>
            <div ref={cardRef} className='myCardRight'>
                <Progress
                    className='myCardRight-diagram'
                    type="circle"
                    percent={percentage}
                    strokeWidth={10}
                    size={diagramBigger ? 'default' : 'small'}
                />
            </div>
        </div>
    )
}
