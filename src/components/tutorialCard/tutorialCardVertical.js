import React, { useRef } from 'react'
import './tutorialCardVertical.less'
import { useSelector } from 'react-redux'
import { CalendarFilled } from '@ant-design/icons'
export default function TutorialCardVertical({ tutorial }) {
  const { cover, level, colorie, brief, name, duration } = tutorial
  const { currentTheme } = useSelector(state => state.user)
  const lightTutorialCardVerticalClassname = currentTheme === 'light' ? 'tutorialCardVertical-light' : ''
  const imgRef = useRef(null)
  return (
    <div className={`tutorialCardVertical ${lightTutorialCardVerticalClassname}`}>
      <div className='tutorialCardVertical-cover'>
        <img ref={imgRef} src={cover} />
        <div className='tutorialCardVertical-cover-detail'>
          <div className='tutorialCardVertical-cover-detail-level'>{level}</div>
          <div className='tutorialCardVertical-cover-detail-duration'>{duration}分钟</div>
        </div>
      </div>
      <div className='tutorialCardVertical-bottom'>
        <div className={`tutorialCardVertical-bottom-desc`}>
          <div className='tutorialCardVertical-bottom-desc-title'>{name}</div>
          <div className='tutorialCardVertical-bottom-desc-brief'>{brief}</div>
        </div>
        <div className='TutorialCardHorizontal-bottom-extraBtn'>
          <CalendarFilled />
        </div>
      </div>
    </div >
  )
}
