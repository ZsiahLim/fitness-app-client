import React, { useEffect, useRef, useState } from 'react'
import './card.less'
import { Progress } from 'antd'
import { useIntl } from 'react-intl'
export default function Card(props) {
    const intl = useIntl()
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
    const { title, number, percentage, recordAt, unit } = cardInfo
    return (
        <div className='myCard'>
            <div className='myCardLeft'>
                <div className='myCardLeft-title'>{title}</div>
                <div className='myCardLeft-number'>{number}&nbsp;<div style={{ fontSize: 12 }}>{unit}</div></div>
                <div className='myCardLeft-percentage'>{intl.formatMessage({ id: 'app.stats.updateSince' })}{recordAt}</div>
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
