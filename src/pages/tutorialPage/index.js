import React, { useState } from 'react'
import './index.less'
import { message } from 'antd'
import yoga from '../../Pic/tutorialIcon/yoga.svg'
import cycling from '../../Pic/tutorialIcon/cycling.svg'
import rope from '../../Pic/tutorialIcon/rope.png'
import strength from '../../Pic/tutorialIcon/strength.svg'
import fat from '../../Pic/tutorialIcon/fat-burning.svg'
import { getalltutorial } from '../../api/user.api'
import { useSelector } from 'react-redux'
import WaterfallContainerForTutorial from '../../components/waterfallContainer/TutorialsWrapper'
import { useLoaderData } from 'react-router-dom'
import { getspecifictypetutorials } from '../../api/tutorial.api'
import { FileOutlined, FolderOpenOutlined, StarOutlined } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import TutorialItem from './components/tutorialItem'
export default function TutorialPage() {
    const { currentTheme } = useSelector(state => state.user)
    const [selectedPage, setSelectedPage] = useState()
    const [allTutorials, setAllTutorials] = useState(useLoaderData())
    const [specificTypeTutorials, setSpecificTutorials] = useState(useLoaderData())
    const getAllTutorials = async (type) => {
        await getalltutorial().then(res => {
            setAllTutorials(res)
        }).catch(err => {
            console.log(err);
            message.error('failed to get tutorial library, try again please')
        })
    }

    const getSpecificTutorials = async (type) => {
        const reqBody = { type }
        console.log(reqBody);
        await getspecifictypetutorials(reqBody).then(res => {
            if (res.status !== false) {
                setSpecificTutorials(res)
                console.log("res", res);
            } else {
                message.error("出现异常，请稍后重试")
            }
        })
    }
    const getRecommandTutorials = async (type) => {
        const reqBody = { type }
        console.log(reqBody);
        await getspecifictypetutorials(reqBody).then(res => {
            if (res.status !== false) {
                setSpecificTutorials(res)
                console.log("res", res);
            } else {
                message.error("出现异常，请稍后重试")
            }
        })
    }
    const lightTutorialPageClassname = currentTheme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            <div className='tutorialItems'>
                <div onClick={() => {
                    setSelectedPage("All")
                    getAllTutorials('yoga')
                }}>
                    <div className='tutorialItem'>
                        <div className='TutorialIcon'><FolderOpenOutlined style={{ fontSize: 30, color: COLORS.white }} /></div>
                        <div className='TutorialTitle'>All</div>
                    </div>
                </div>
                <div onClick={() => {
                    setSelectedPage("Recommand")
                    getSpecificTutorials('yoga')
                }}>
                    <div className='tutorialItem'>
                        <div className='TutorialIcon'>
                            <StarOutlined style={{ fontSize: 30, color: COLORS.white }} />
                        </div>
                        <div className='TutorialTitle'>Recommand</div>
                    </div>
                </div>
                <div onClick={() => {
                    setSelectedPage("Yoga")
                    getSpecificTutorials('yoga')
                }}><TutorialItem tutorial={{ title: "Yoga", icon: yoga }} /></div>
                <div onClick={() => {
                    setSelectedPage("Jump  rope")
                    getSpecificTutorials('rope')
                }}><TutorialItem tutorial={{ title: "Jump rope", icon: rope }} /></div>
                <div onClick={() => {
                    setSelectedPage("Fat burning")
                    getSpecificTutorials('burning')
                }}><TutorialItem tutorial={{ title: "Fat burning", icon: fat }} /></div>
                <div onClick={() => {
                    setSelectedPage("Cycling")
                    getSpecificTutorials('cycling')
                }}><TutorialItem tutorial={{ title: "Cycling", icon: cycling }} /></div>
                <div onClick={() => {
                    setSelectedPage("Strength")
                    getSpecificTutorials('strength')
                }}><TutorialItem tutorial={{ title: "Strength", icon: strength }} /></div>
            </div>
            <div className='tutorialContent'>
                <div className='tutorialRecommand'>
                    <h2>{selectedPage ? selectedPage : "All"}</h2>
                </div>
                <div className='tutorialSeries' style={{ display: 'flex' }}>
                    {specificTypeTutorials.length !== 0 && <WaterfallContainerForTutorial tutorials={specificTypeTutorials} />}
                </div>
            </div>
        </div>
    )
}
