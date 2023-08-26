import React, { useEffect, useState } from 'react'
import './myCarousel.less'
import {
    LeftCircleOutlined,
    RightCircleOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
const MyCarousel = ({ imgArr }) => {
    let { theme } = useParams()
    useEffect(() => {
        console.log("imgArr", imgArr);
    }, [])
    // const imgArr = [
    //     "https://firebasestorage.googleapis.com/v0/b/fitness-app-medal.appspot.com/o/Leon%20Chin-blog-1686667281?alt=media&token=59d33c89-3dfc-4f80-a7ac-db4ba71ade09",
    //     "https://firebasestorage.googleapis.com/v0/b/fitness-app-medal.appspot.com/o/Leon%20Chin-blog-1686667230?alt=media&token=2f536227-4161-42cf-b3e9-3531e9f03f4b",
    //     "https://firebasestorage.googleapis.com/v0/b/fitness-app-medal.appspot.com/o/test3-blog-1687020735?alt=media&token=d68db3b7-c550-4845-91cb-c7f0d877a1f0",
    //     "https://firebasestorage.googleapis.com/v0/b/fitness-app-medal.appspot.com/o/test3-blog-1686813153?alt=media&token=fb9d8d0d-0895-497a-92c2-0100f4440f3b",
    // ]
    const [seletedIndex, setSelectedIndex] = useState(0)
    const handleLeftSlideAction = () => setSelectedIndex((seletedIndex - 1 + imgArr.length) % imgArr.length)
    const handleRightSlideAction = () => setSelectedIndex((seletedIndex + 1) % imgArr.length)
    const lightDisplayIndex = theme === 'light' ? 'displayIndex-light' : ''
    return (
        <div className="myCarouselContainer">
            {imgArr && <div className='myCarousel'>
                {/* 这是照片合集分页 */}
                <div
                    className='myCarouselSlider'
                    style={{
                        width: `${imgArr.length}00%`,
                        transform: `translate(-${seletedIndex * (100 / imgArr.length)}%)`
                    }}
                >
                    {imgArr.map((item) => (
                        <section>
                            <img src={item} />
                        </section>
                    ))}
                </div>
                {imgArr.length > 1 &&
                    <>
                        <div className="myCarouselSliderControls">
                            {/* 这是照片左右滑动按钮 */}
                            <div
                                className="myCarouselSliderControlsBlock left"
                                onClick={handleLeftSlideAction}
                            >
                                <LeftCircleOutlined className="myCarouselSliderControls-arrow left" />
                            </div>
                            <div
                                className="myCarouselSliderControlsBlock right"
                                onClick={handleRightSlideAction}
                            >
                                <RightCircleOutlined className="myCarouselSliderControls-arrow right" />
                            </div>
                            {/* 这是下面的点 */}
                            <ul>
                                {imgArr.map((item, index) => (
                                    <li style={{ backgroundColor: seletedIndex === index ? "#747474" : "transparent" }}></li>
                                ))}
                            </ul>
                        </div>
                        <div className={`displayIndex ${lightDisplayIndex}`}>
                            {seletedIndex + 1} / {imgArr.length}
                        </div>
                    </>}
            </div>}
        </div>
    )
}
export default MyCarousel
