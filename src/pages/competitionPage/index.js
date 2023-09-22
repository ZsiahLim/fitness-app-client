import React, { useState } from 'react'
import './index.less'
import CompetitionCard from './competitionCard'
import pngurl1 from '../../Pic/monitorProcess.webp'
import pngurl2 from '../../Pic/contact.webp'
import pngurl3 from '../../Pic/tutorial.webp'
import pngurl4 from '../../Pic/game.webp'
import pngurl5 from '../../Pic/workoutPlan.jpg'
import { useSelector } from 'react-redux'

export default function CompetitionPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const [selectedPic, setSelectedPic] = useState(1)
    const lightCompetitionPageClassname = currentTheme === 'light' ? 'competitionPage-light' : ''
    return (
        <div className={`competitionPage ${lightCompetitionPageClassname}`}>
            <div className='myCompetition'>
                <div className='myParticipatedCompetition'>
                    <div className='title'><h1>My Competition</h1></div>
                </div>
                <div className='myMedal'>
                    <div className='title'><h1>My Medals</h1></div>
                    <div className='medals'>
                        <div className='carousel'>
                            <div className='images-wrapper'>
                                <img src={pngurl1} className={`image img-1 ${selectedPic === 1 && "show"}`}></img>
                                <img src={pngurl2} className={`image img-2 ${selectedPic === 2 && "show"}`}></img>
                                <img src={pngurl3} className={`image img-3 ${selectedPic === 3 && "show"}`}></img>
                                <img src={pngurl4} className={`image img-4 ${selectedPic === 4 && "show"}`}></img>
                                <img src={pngurl5} className={`image img-5 ${selectedPic === 5 && "show"}`}></img>
                            </div>
                            <div className='text-slider'>
                                <div className='text-wrap'>
                                    <div className='text-group' style={{ transform: `translateY(${-(selectedPic - 1) * 2.2}rem)` }}>
                                        <h2>Track your workout prograss</h2>
                                        <h2>Contact with your friends</h2>
                                        <h2>Watch the rich tutorial library</h2>
                                        <h2>Gamification features</h2>
                                        <h2>Personalized Exercise Plan</h2>
                                    </div>
                                </div>
                                <div className='bullets'>
                                    <span className={selectedPic === 1 ? `active` : ''} onClick={() => setSelectedPic(1)}></span>
                                    <span className={selectedPic === 2 ? `active` : ''} onClick={() => setSelectedPic(2)}></span>
                                    <span className={selectedPic === 3 ? `active` : ''} onClick={() => setSelectedPic(3)}></span>
                                    <span className={selectedPic === 4 ? `active` : ''} onClick={() => setSelectedPic(4)}></span>
                                    <span className={selectedPic === 5 ? `active` : ''} onClick={() => setSelectedPic(5)}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='competitionEvents'>
                <div className='title'><h1>June competitions</h1></div>
                <div className='competitionList'>
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                </div>
            </div>
        </div >
    )
}
