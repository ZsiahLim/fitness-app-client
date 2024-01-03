import distance from '../../../Pic/distance.png'
import COLORS from '../../../constants/COLORS'
import { useIntl } from 'react-intl'

const DistanceTitle = () => {
    const intl = useIntl()
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                <img src={distance} style={{ width: 16, height: 16 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{intl.formatMessage({ id: 'app.stats.title.dist' })}</div>
        </div>
    )
}

export default DistanceTitle