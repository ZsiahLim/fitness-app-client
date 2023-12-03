import React, { useEffect, useState } from 'react'
import './index.less'
import { getalltutorial } from '../../api/user.api'
import { message } from 'antd'
import TutorialCardHorizontal from '../tutorialCard/tutorialCardHorizontal'
import { useIntl } from 'react-intl'
import { RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import COLORS from '../../constants/COLORS'
import CardTitle from '../CardTitle'
export default function RecommandTutorials() {
    const [recommandTutorials, setRecommandTutorials] = useState()
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate()
    const getRecommandTutorials = async () => {
        await getalltutorial().then(res => {
            if (res.status !== false) {
                setRecommandTutorials(res)
            } else {
                message.error("出现异常请稍后重试")
            }
        }).catch(err => {
            message.error("出现异常请稍后重试")
        })
    }
    useEffect(() => {
        getRecommandTutorials()
    }, [])
    const lightEvaluateClassname = currentTheme === 'light' ? 'Evaluate-light' : ''
    return (
        <div className='RecommandForUser'>
            <CardTitle title={formatMessage({ id: 'recommandForU' })} />
            <div className={`Evaluate ${lightEvaluateClassname}`}
                style={{ backgroundColor: COLORS.primary, color: COLORS.white, fontWeight: '500' }}
                onClick={() => navigateTo('/evaluate')}
            >
                <div className='personalizedWords'>
                    {formatMessage({ id: 'evaluateLevel' })}
                </div>
                <div className='personalizedBtn'>
                    <RightOutlined style={{ color: COLORS.black }} />
                </div>
            </div>
            <div className='RecommandForUser-content'>
                {recommandTutorials && recommandTutorials.map((item, index) => (
                    <TutorialCardHorizontal key={index} tutorial={item} withCalendar={true} />
                ))}
            </div>
        </div>
    )
}
