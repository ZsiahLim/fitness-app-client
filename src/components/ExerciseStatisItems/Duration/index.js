import duration from '../../../Pic/duration.png'
import COLORS from '../../../constants/COLORS'
import { useIntl } from 'react-intl'

const DurationTitle = () => {
    const intl = useIntl()
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.purple, borderRadius: 9 }}>
                <img src={duration} style={{ width: 16, height: 16 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.purple }}>{intl.formatMessage({ id: 'app.stats.title.duration' })}</div>
        </div>
    )
}

export default DurationTitle