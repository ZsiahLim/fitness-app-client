import React, { useState, useEffect, useRef } from 'react'
import Card from './card'
import { Col, Row } from 'antd';
import './index.less'
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
export default function Index(props) {//need to update
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const statisticDashboardClassname = currentTheme === 'light' ? 'statistic-light' : ''

    const cardsInfo = {
        steps: {
            title: `${formatMessage({ id: 'steps' })}`,
            number: '26888',
            percentage: '1'
        },
        colorie: {
            title: `${formatMessage({ id: 'colorie' })}`,
            number: '158',
            percentage: '100'
        },
        distance: {
            title: `${formatMessage({ id: 'distance' })}`,
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
    const cardslight = currentTheme === 'light' ? 'myCards-light' : ''
    return (
        <div className={`statistic ${statisticDashboardClassname}`}>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={steps} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={colorie} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={distance} /></div>
            <div className={`myCards ${cardslight}`} style={{ width: '49%', height: '48%' }}><Card cardInfo={days} /></div>
        </div>
    )
}
