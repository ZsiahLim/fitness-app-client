import React, { useEffect, useState } from 'react'
import './index.less'
import { Empty, message } from 'antd'
import yoga from '../../Pic/tutorialIcon/yoga.svg'
import cycling from '../../Pic/tutorialIcon/cycling.svg'
import rope from '../../Pic/tutorialIcon/rope.png'
import relax from '../../Pic/tutorialIcon/relaxation.png'
import stretching from '../../Pic/tutorialIcon/stretching.png'
import strength from '../../Pic/tutorialIcon/strength.png'
import loseweight from '../../Pic/tutorialIcon/loseweight.png'
import { useSelector } from 'react-redux'
import WaterfallContainerForTutorial from '../../components/waterfallContainer/TutorialsWrapper'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { FolderOpenOutlined, RightOutlined, StarOutlined } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import TutorialItem from './components/tutorialItem'
import EXERCISETYPE from '../../constants/EXERCISETYPE'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import SIZE from '../../constants/SIZE'
export default function TutorialPage() {
    const { type } = useParams()
    const theme = useUserTheme()
    const navigateTo = useNavigate()
    const THEME = APPTHEME[theme]
    const { currentTheme } = useSelector(state => state.user)
    const [selectedPage, setSelectedPage] = useState(type ? type : "All")
    const loaderTutorials = useLoaderData()
    useEffect(() => {
        setSpecificTutorials(loaderTutorials)
    }, [loaderTutorials])
    const [specificTypeTutorials, setSpecificTutorials] = useState(loaderTutorials)
    const lightTutorialPageClassname = currentTheme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            <div className='tutorialItems'>
                <div onClick={() => {
                    setSelectedPage("All")
                    navigateTo('/tutorial')
                }}>
                    <div className='tutorialItem'>
                        <div className='TutorialIcon'><FolderOpenOutlined style={{ fontSize: 30, color: COLORS.white }} /></div>
                        <div className='TutorialTitle'>All</div>
                    </div>
                </div>
                <div onClick={() => {
                    setSelectedPage("Recommand")
                    navigateTo(`/tutorial/recommand`)
                }}>
                    <div className='tutorialItem'>
                        <div className='TutorialIcon'>
                            <StarOutlined style={{ fontSize: 30, color: COLORS.white }} />
                        </div>
                        <div className='TutorialTitle'>Recommand</div>
                    </div>
                </div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.yoga.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.yoga.value}`)
                }}><TutorialItem tutorial={{ title: "Yoga", icon: yoga }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.rope.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.rope.value}`)
                }}><TutorialItem tutorial={{ title: "Jump rope", icon: rope }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.burning.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.burning.value}`)
                }}><TutorialItem tutorial={{ title: "Fat burning", icon: loseweight }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.spinning.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.spinning.value}`)
                }}><TutorialItem tutorial={{ title: "Cycling", icon: cycling }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.strength.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.strength.value}`)
                }}><TutorialItem tutorial={{ title: "Strength", icon: strength }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.warmup.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.warmup.value}`)
                }}><TutorialItem tutorial={{ title: EXERCISETYPE.warmup.label, icon: stretching }} /></div>
                <div onClick={() => {
                    setSelectedPage(EXERCISETYPE.cooldown.label)
                    navigateTo(`/tutorial/${EXERCISETYPE.cooldown.value}`)
                }}><TutorialItem tutorial={{ title: EXERCISETYPE.cooldown.label, icon: relax }} /></div>
            </div>
            <div className='tutorialContent'>
                <div className='tutorialRecommand'>
                    <h2>{selectedPage}</h2>
                </div>
                <div className='tutorialSeries' style={{ display: 'flex' }}>
                    {specificTypeTutorials.length !== 0 && <WaterfallContainerForTutorial tutorials={specificTypeTutorials} />}
                    {specificTypeTutorials.length === 0 &&
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 500, height: 400, borderRadius: SIZE.CardBorderExtraRadius, padding: SIZE.LargerMargin, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.contentColor }}>
                                <Empty description={false} />
                                <div>
                                    暂时无法根据您的需求生成推荐
                                </div>
                                <div onClick={() => navigateTo('/evaluate')} className='buttonHover' style={{ backgroundColor: COLORS.primary, color: COLORS.white, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, marginTop: SIZE.NormalMargin }}>
                                    评估你的健康水平来个性化内容<RightOutlined />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
