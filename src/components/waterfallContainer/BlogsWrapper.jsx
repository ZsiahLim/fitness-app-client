import { useEffect, useRef, useState } from 'react'
import BlogBrief from '../../pages/blogPage/components/blogBrief'
import './index.less'

export default function WaterfallContainer({ blogs }) {
    const wrapperRef = useRef(null)
    const [waterfallItemsWidth, setWaterfallItemsWidth] = useState(0)
    const calcWaterfall = (column, gap) => {
        const J_waterfall = wrapperRef.current
        const wrapperWidth = J_waterfall.offsetWidth
        const waterfallItems = J_waterfall.querySelectorAll('.waterfallContainer-item')
        const waterfallItemsWidth = (wrapperWidth - (column - 1) * gap) / column
        setWaterfallItemsWidth(waterfallItemsWidth)
        const previousHeightArr = []
        let minIdx = -1
        waterfallItems.forEach((item, index) => {
            item.style.width = waterfallItemsWidth + 'px'
            if (index < column) {
                item.style.top = '0px'
                item.style.left = index * (waterfallItemsWidth + gap) + 'px'
                previousHeightArr.push(item.offsetHeight)
            } else {
                minIdx = getMinIdx(previousHeightArr)
                item.style.left = waterfallItems[minIdx].offsetLeft + 'px'
                item.style.top = previousHeightArr[minIdx] + gap + 'px'
                previousHeightArr[minIdx] += item.offsetHeight + gap
            }
        })

    }
    const getMinIdx = (arr) => {
        return arr.indexOf(Math.min(...arr))
    }

    return (
        <div className='waterfallContainer' ref={wrapperRef}>
            {blogs.map((blog, index) => <div key={index} className='waterfallContainer-item'>
                <BlogBrief calcWaterfall={calcWaterfall} waterfallItemsWidth={waterfallItemsWidth} key={blog._id} blogInfo={blog} />
            </div>)
            }
        </div >
    )
}
