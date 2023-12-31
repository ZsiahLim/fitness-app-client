import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { RightOutlined } from "@ant-design/icons"
import './index.less'
import PlanPage from '../../../../../../Pic/planIcon.png'

const NavigateToPlanPage = () => {
    const navigateTo = useNavigate()
    const { formatMessage } = useIntl()
    return <div key={1} className='AddSchedule' onClick={() => navigateTo('/calender')}>
        <div className="AddSchedule-btn" style={{ fontWeight: 'bold', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={PlanPage} style={{ height: 30, width: 30 }} /> {formatMessage({ id: 'goplanpage' })}
            </div>
            <RightOutlined />
        </div>
    </div>
}

export default NavigateToPlanPage