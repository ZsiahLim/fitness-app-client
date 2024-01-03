import React, { useEffect, useState } from 'react'
import './tutorialCardHorizontal.less'
import { CalendarOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useIsTutorialHasAlr from '../../hooks/useIsTutorialHasAlr'
import { message } from 'antd'
import { loginSuccess } from '../../redux/userSlice'
import { setSessions } from '../../redux/SessionSlice'
import { createsession } from '../../api/session.api'
import { getspecifictutorial } from '../../api/tutorial.api'
import { useIntl } from 'react-intl'  
import useUserLocale from '../../hooks/useUserLocale'

export default function TutorialCardHorizontalWithID({ tutorialID, withCalendar }) {
  const intl = useIntl()
  const userLocale = useUserLocale()
  const [tutorial, setTutorial] = useState({})
  const getTutorial = async () => {
    await getspecifictutorial(tutorialID).then(res => {
      if (res.status !== false) {
        setTutorial(res)
      } else {
        message.error('获取教程失败')
      }
    }).catch(err => {
      message.error('获取教程失败')
    })
  }
  useEffect(() => {
    getTutorial()
  }, [])
  const { _id, name, zh_name, brief, zh_brief, cover, lowerEstimateColorie, higherEstimateColorie, duration, description, zh_description, level, rate, users, video, type, equipments } = tutorial
  const navigateTo = useNavigate()
  const { userSelectDay } = useSelector(state => state.calendar)
  const { currentTheme } = useSelector(state => state.user)
  const lightTutorialClassname = currentTheme === 'light' ? 'TutorialCardHorizontal-light' : ''
  const isTodayHasAlr = useIsTutorialHasAlr(_id)
  const dispatch = useDispatch()
  const handleAddToCalendar = async () => {
    if (isTodayHasAlr) {
      message.error(intl.formatMessage({id: 'error.tut.added'}))
    } else {
      const newSession = {
        date: new Date(userSelectDay),
        tutorial: _id,
      }
      await createsession(newSession).then(res => {
        if (res.status === false) {
          message.error(intl.formatMessage({id: 'error.errorMsg'}))
        } else {
          dispatch(loginSuccess(res.user))
          dispatch(setSessions(res.updatedSessions))
        }
      })
    }
  }
  return (
    <div
      onClick={() => navigateTo(`/specifictutorial/${_id}`)}
      className={`TutorialCardHorizontal ${lightTutorialClassname}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          flexShrink: 0,
          flexBasis: 60,
          height: 60,
          width: 60,
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: 10
        }}>
          <img style={{ maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} src={cover} />
        </span>
        <div className='TutorialCardHorizontal-desc'>
          {/* <div className='TutorialCardHorizontal-desc-title'>{name}</div> */}
          <div className='TutorialCardHorizontal-desc-content'>{level} - {duration}{intl.formatMessage({id: 'app.tut.timeUnit'})} - {lowerEstimateColorie}~{higherEstimateColorie}{intl.formatMessage({id: 'app.tut.calUnit'})}</div>
          <div className='TutorialCardHorizontal-desc-title'>{userLocale === "zh" ? zh_name : name}</div>
          {/* <div className='TutorialCardHorizontal-desc-content'>{level} - {duration}分钟 - {lowerEstimateColorie}~{higherEstimateColorie}千卡</div> */}
        </div>
      </div>
      {
        withCalendar && <span
          className='TutorialCardHorizontal-extraBtn'
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCalendar()
          }}
        >
          <CalendarOutlined />
        </span>
      }
    </div >
  )
}
