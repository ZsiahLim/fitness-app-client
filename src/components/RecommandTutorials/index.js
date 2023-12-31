import React, { useEffect, useState } from 'react'
import './index.less'
import { getalltutorial } from '../../api/user.api'
import { Empty, message } from 'antd'
import TutorialCardHorizontal from '../tutorialCard/tutorialCardHorizontal'
import { useIntl } from 'react-intl'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import COLORS from '../../constants/COLORS'
import CardTitle from '../CardTitle'
import { getrecommandtutorials } from '../../api/tutorial.api'
import { isEmptyObj } from '../../utils/funcs'
import SIZE from '../../constants/SIZE'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import preference from '../../Pic/preference.png'
export default function RecommandTutorials() {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const [recommandTutorials, setRecommandTutorials] = useState([])
    const { currentTheme, currentUser } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate()
    const getRecommandTutorials = async () => {
        await getrecommandtutorials().then(res => {
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
    const [show, setShow] = useState(true)
    const CollapsedBtn = () => {
        return <div className='buttonHover' onClick={() => setShow(!show)}>{show ? <DownOutlined /> : <RightOutlined />}</div>
    }
    return (
        <div className='RecommandForUser'>
            <CardTitle title={formatMessage({ id: 'recommandForU' })} extra={<CollapsedBtn />} />
            {show && <><div className={`Evaluate ${lightEvaluateClassname}`}
                style={{ backgroundColor: COLORS.primary, color: COLORS.white, fontWeight: '500' }}
                onClick={() => navigateTo('/evaluate')}
            >
                <div className='personalizedWords' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={preference} style={{ height: 30, width: 30 }} />
                    {formatMessage({ id: 'evaluateLevel' })}
                </div>
                <RightOutlined style={{ color: COLORS.white }} />
            </div>
                <div className='RecommandForUser-content'>
                    {recommandTutorials.length !== 0 && recommandTutorials.map((item, index) => (
                        <TutorialCardHorizontal key={index} tutorial={item} withCalendar={true} />
                    ))}
                    {(recommandTutorials.length === 0 && currentUser?.personalPrefer && !isEmptyObj(currentUser?.personalPrefer)) && (
                        <div style={{ marginTop: SIZE.LargerMargin, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.backgroundColor }}>
                            <Empty description={false} />
                            <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.commentText }}>抱歉我们无法找到满足适合您喜好的教程</div>
                        </div>
                    )}
                    {(recommandTutorials.length === 0 && (!currentUser?.personalPrefer || isEmptyObj(currentUser?.personalPrefer))) && (
                        <div style={{ marginTop: SIZE.LargerMargin, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.backgroundColor }}>
                            <Empty description={false} />
                            <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.commentText }}>请做一下喜好问卷，来为您个性化推荐适合您喜好的教程</div>
                        </div>
                    )}
                </div>
            </>}
        </div>
    )
}
