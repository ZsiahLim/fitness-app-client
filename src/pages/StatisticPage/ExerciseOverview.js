import { useIntl } from "react-intl";
import useUserTheme from "../../hooks/useUserTheme";
import APPTHEME from "../../constants/COLORS/APPTHEME";
import SIZE from "../../constants/SIZE";
import COLORS from "../../constants/COLORS";
import { secToSpecificMin } from "../../utils/funcs";

const ExerciseOverview = ({ durationSum, calorieSum, distanceSum, stepSum }) => {
    const intl = useIntl();
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return <div style={{ borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.contentColor, marginBottom: SIZE.NormalMargin }}>
        <div style={{ fontWeight: 'bold', fontSize: 16, }}>{intl.formatMessage({ id: 'app.stats.title.summary' })}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.dist' })} titleColor={COLORS.primary} value={distanceSum ? (distanceSum / 1000).toFixed(2) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.dist' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.step' })} titleColor={COLORS.primary} value={stepSum ? stepSum : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.step' })} />
            </div>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.cal' })} titleColor={COLORS.colorieOrange} value={calorieSum ? calorieSum.toFixed(1) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.cal' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.duration' })} titleColor={COLORS.purple} value={durationSum ? secToSpecificMin(durationSum) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.duration' })} />
            </div>
        </div>
    </div>
}

const ExerciseItem = ({ title, titleColor, value, unit }) => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return <div style={{ flex: 1, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin, backgroundColor: THEME.backgroundColor }}>
        <div style={{ display: 'flex', gap: 3 }}>
            { }
            <div style={{ color: titleColor, fontWeight: 'bold' }}>
                {title}
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{value}</div><div style={{ fontSize: 12 }}>{unit}</div>
        </div>
    </div>
}

export default ExerciseOverview