import React, { useEffect, useState } from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import Percentage from '../../../components/Percentage'
import NoSchedule from '../../../components/noSchedule'
import DoneTodoItem from './DoneTodoItem'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import UnDoneTodoItem from './UnDoneTodoItem'
import { DownOutlined, RightOutlined } from '@ant-design/icons'

export default function TodayTodo({ selectDay }) {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)
    const [noTutorial, setNoTutorial] = useState(yetDoneTutorial.length === 0 && doneTutorial.length === 0)
    const [collapseUndo, setCollapseUndo] = useState(false)
    const [collapseDone, setCollapseDone] = useState(false)
    useEffect(() => {
        const noTutorial = yetDoneTutorial.length === 0 && doneTutorial.length === 0
        setNoTutorial(noTutorial)
    }, [yetDoneTutorial, doneTutorial])
    return (
        <div>
            {!noTutorial && <Percentage currentValue={doneTutorial.length} targetValue={yetDoneTutorial.length + doneTutorial.length} selectDay={selectDay} />}
            {noTutorial && <NoSchedule />}
            {yetDoneTutorial.length !== 0 && <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor, fontWeight: 'bold' }}>
                    <div>未完成: {yetDoneTutorial.length}</div>
                    <div onClick={() => setCollapseUndo(!collapseUndo)}>
                        {collapseUndo ? <RightOutlined /> : <DownOutlined />}
                    </div>
                </div>
                {!collapseUndo && yetDoneTutorial.map((tutorial, index) => <UnDoneTodoItem tutorial={tutorial} key={index} />)}
            </>}
            {doneTutorial.length !== 0 && <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor, fontWeight: 'bold' }}>
                    <div>已完成: {doneTutorial.length}</div>
                    <div onClick={() => setCollapseDone(!collapseDone)}>
                        {collapseDone ? <RightOutlined /> : <DownOutlined />}
                    </div>
                </div>
                {!collapseDone && doneTutorial.map((tutorial, index) => <DoneTodoItem tutorial={tutorial} key={index} />)}
            </>}
        </div>
    )
}
