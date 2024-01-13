import React from 'react'
import ICON from '../../../Pic/targetIcon-gray.png'

function RightSideIcon() {
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <img src={ICON} style={{ width: 100, }} />
            </div>
        </div>
    )
}

export default RightSideIcon