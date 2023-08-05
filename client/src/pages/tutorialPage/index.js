import React, { useEffect, useState } from 'react'
import './index.less'
import { useParams } from 'react-router-dom'
import TutorialItem from './tutorialItem'
import { Divider, message } from 'antd'
import TutorialIntro from './tutorialIntro'
import axios from 'axios'
import { Empty, Button } from 'antd'
import yoga from '../../Pic/tutorialIcon/yoga.svg'
import cycling from '../../Pic/tutorialIcon/cycling.svg'
import rope from '../../Pic/tutorialIcon/rope-jumping-trans.svg'
import walk from '../../Pic/tutorialIcon/walk.svg'
import strength from '../../Pic/tutorialIcon/strength.svg'
import health from '../../Pic/tutorialIcon/health.svg'
import fat from '../../Pic/tutorialIcon/fat-burning.svg'
import aerobics from '../../Pic/tutorialIcon/aerobics.svg'
export default function TutorialPage() {
    let { theme } = useParams()
    const [selectedPage, setSelectedPage] = useState()
    const [tutorialLib, setTutorialLibs] = useState([])
    const getLibs = async (type) => {
        await axios.get(`http://localhost:3001/api/tutorialLibraries/${type}`).then(res => {
            console.log(res.data);
            setTutorialLibs(res.data)
        }).catch(err => {
            console.log(err);
            message.error('failed to get tutorial library, try again please')
        })
    }
    useEffect(() => {
        getLibs('yoga')
    }, [])

    const lightTutorialPageClassname = theme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            <div className='tutorialItems'>
                <div onClick={() => {
                    setSelectedPage("Yoga")
                    getLibs('yoga')
                }}><TutorialItem tutorial={{ title: "Yoga", icon: yoga }} /></div>
                <div onClick={() => {
                    setSelectedPage("Jump  rope")
                    getLibs('rope')
                }}><TutorialItem tutorial={{ title: "Jump rope", icon: rope }} /></div>
                <div onClick={() => {
                    setSelectedPage("Walk")
                    getLibs('walk')
                }}><TutorialItem tutorial={{ title: "Walk", icon: walk }} /></div>
                <div onClick={() => {
                    setSelectedPage("Fat burning")
                    getLibs('fat')
                }}><TutorialItem tutorial={{ title: "Fat burning", icon: fat }} /></div>
                <div onClick={() => {
                    setSelectedPage("Cycling")
                    getLibs('cycling')
                }}><TutorialItem tutorial={{ title: "Cycling", icon: cycling }} /></div>
                <div onClick={() => {
                    setSelectedPage("Aerobics")
                    getLibs('aerobics')
                }}><TutorialItem tutorial={{ title: "Aerobics", icon: aerobics }} /></div>
                <div onClick={() => {
                    setSelectedPage("Health")
                    getLibs('healthy')
                }}><TutorialItem tutorial={{ title: "Health", icon: health }} /></div>
                <div onClick={() => {
                    setSelectedPage("Strength")
                    getLibs('strength')
                }}><TutorialItem tutorial={{ title: "Strength", icon: strength }} /></div>
            </div>
            <Divider />
            <div className='tutorialContent'>
                <div className='tutorialRecommand'>
                    <h2>{selectedPage ? selectedPage : "Recommand For You"}</h2>
                </div>
                <div className='tutorialSeries'>
                    {tutorialLib.length !== 0 ?
                        tutorialLib.map((tutorialVideo) => <TutorialIntro key={tutorialVideo._id} tutorialVideo={tutorialVideo} />)
                        : <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={
                                <span>
                                    Customize <a href="#API">Description</a>
                                </span>
                            }
                        >
                            <Button type="primary">Create Now</Button>
                        </Empty>}
                </div>
            </div>
        </div>
    )
}
