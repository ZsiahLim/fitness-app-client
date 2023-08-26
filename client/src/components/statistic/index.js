import React, { useState, useEffect, useRef } from 'react'
import Card from './card'
import { Col, Row } from 'antd';
import './index.less'
export default function Index(props) {
    const { theme } = props

    const statisticDashboardClassname = theme === 'light' ? 'statistic-light' : ''

    const cardsInfo = {
        steps: {
            title: `Steps`,
            number: '26888',
            percentage: '1'
        },
        colorie: {
            title: `Colorie`,
            number: '158',
            percentage: '100'
        },
        distance: {
            title: `Distance`,
            number: '26888',
            percentage: '10'
        },
        days: {
            title: 'Days',
            number: '15',
            percentage: '50'
        },
    }
    const { steps, colorie, distance, days } = cardsInfo
    const cardslight = theme === 'light' ? 'myCards-light' : ''
    return (
        <div className={`statistic ${statisticDashboardClassname}`}>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={steps} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={colorie} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={distance} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={days} /></div>
        </div>
    )
}
