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
export default function TutorialCardHorizontal({ tutorial, withCalendar }) {
  const { cover, level, colorie, name, duration, _id } = tutorial
  const navigateTo = useNavigate()
  const { userSelectDay } = useSelector(state => state.calendar)
  const { currentTheme } = useSelector(state => state.user)
  const lightTutorialClassname = currentTheme === 'light' ? 'TutorialCardHorizontal-light' : ''
  const isTodayHasAlr = useIsTutorialHasAlr(_id)
  const dispatch = useDispatch()
  const handleAddToCalendar = async () => {
    if (isTodayHasAlr) {
      message.error("今日已有这个训练了")
    } else {
      const newSession = {
        date: new Date(userSelectDay),
        tutorial: _id,
      }
      await createsession(newSession).then(res => {
        if (res.status === false) {
          message.error("出现异常, 请稍后再试")
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
      <span className='TutorialCardHorizontal-cover'>
        <img src={cover} />
      </span>
      <span className='TutorialCardHorizontal-desc'>
        <div className='TutorialCardHorizontal-desc-title'>{name}</div>
        <div className='TutorialCardHorizontal-desc-content'>{level} - {duration}分钟 - {colorie}千卡</div>
      </span>
      {withCalendar && <span
        className='TutorialCardHorizontal-extraBtn'
        onClick={(e) => {
          e.stopPropagation()
          handleAddToCalendar()
        }}
      >
        <CalendarOutlined />
      </span>}
    </div>
  )
}
