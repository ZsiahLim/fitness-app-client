import React from 'react'
import './tutorialCardHorizontal.less'
import { CalendarOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useIsTutorialHasAlr from '../../hooks/useIsTutorialHasAlr'
import { message } from 'antd'
import { loginSuccess } from '../../redux/userSlice'
import { setSessions } from '../../redux/SessionSlice'
import { createsession } from '../../api/session.api'
import { useIntl } from 'react-intl'
export default function TutorialCardHorizontal({ tutorial, withCalendar }) {
  const intl = useIntl()
  const { cover, level, lowerEstimateColorie, higherEstimateColorie, name, duration, _id } = tutorial
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
        <div>
          <div className='TutorialCardHorizontal-desc-title'>{name}</div>
          <div className='TutorialCardHorizontal-desc-content'>{level} - {duration}{intl.formatMessage({id: 'app.tut.timeUnit'})} - {lowerEstimateColorie}~{higherEstimateColorie}{intl.formatMessage({id: 'app.tut.calUnit'})}</div>
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
