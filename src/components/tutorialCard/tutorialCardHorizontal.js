import React from 'react'
import './tutorialCardHorizontal.less'
import { CalendarOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
export default function TutorialCardHorizontal({ tutorial }) {
  const { cover, level, colorie, name, duration } = tutorial
  const { currentTheme } = useSelector(state => state.user)
  const lightTutorialClassname = currentTheme === 'light' ? 'TutorialCardHorizontal-light' : ''
  return (
    <div className={`TutorialCardHorizontal ${lightTutorialClassname}`}>
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
