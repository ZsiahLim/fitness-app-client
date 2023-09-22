import React, { useState } from 'react'
import imgPath2 from '../../Pic/game.webp'
import { Avatar, Button } from 'antd'
import { useSelector } from 'react-redux'


export default function CompetitionCard({ competitionInfo }) {
    const { currentTheme } = useSelector((state) => state.user)
    const lightOneCompetitionClassname = currentTheme === 'light' ? 'oneCompetition-light' : ''
    return (
        <div className={`oneCompetition  ${lightOneCompetitionClassname}`}>
            <div className='competitionImg'>
                <img className='compImg' src={imgPath2} />
            </div>
            <div className='competitionInfo'>
                <div className='compWords'>
                    <div className='competitionTitle'><h2>Hello Kitty Theme | Running</h2></div>
                    <div className='competitionDate'>Sign Up period: 28-06-2023~28-07-2023</div>
                    <div className='competitorNum'>21000 people have participated</div>
                </div>
                <div className='competitionSignupBtn'><Button>Go to Sign up</Button></div>
            </div>
        </div>
    )
}

