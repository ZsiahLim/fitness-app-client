import React from 'react'
import './tutorialCardHorizontal.less'
import { CalendarOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function TutorialCardHorizontal({ tutorial }) {
  const { cover, level, colorie, name, duration, _id } = tutorial
  const navigateTo = useNavigate()
  const { currentTheme } = useSelector(state => state.user)
  const lightTutorialClassname = currentTheme === 'light' ? 'TutorialCardHorizontal-light' : ''
  return (
    <div onClick={() => navigateTo(`/specifictutorial/${_id}`)} className={`TutorialCardHorizontal ${lightTutorialClassname}`}>
      <span className='TutorialCardHorizontal-cover'>
        <img src={cover} />
      </span>
      <span className='TutorialCardHorizontal-desc'>
        <div className='TutorialCardHorizontal-desc-title'>{name}</div>
        <div className='TutorialCardHorizontal-desc-content'>{level} - {duration}分钟 - {colorie}千卡</div>
      </span>
      <span className='TutorialCardHorizontal-extraBtn'>
        <CalendarOutlined />
      </span>
    </div>
  )
}
