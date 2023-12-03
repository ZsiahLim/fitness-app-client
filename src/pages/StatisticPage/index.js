import './index.less'
import { useSelector } from 'react-redux'

export default function StatisticsPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const lightPageClassname = currentTheme === 'light' ? 'StatisticsPage-light' : ''
    return (
        <div className={`StatisticsPage ${lightPageClassname}`}>

        </div >
    )
}
