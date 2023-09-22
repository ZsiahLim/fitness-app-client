import { Empty } from 'antd'
import React from 'react'

export default function EmptyBlog() {
    return (
        <div style={{ marginTop: "100px" }}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 180 }}
                description={
                    <span>
                        No blog fits
                    </span>
                }
            >
            </Empty>
        </div>
    )
}
