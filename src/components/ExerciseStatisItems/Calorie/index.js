import calorie from '../../../Pic/calorie.png'
import COLORS from '../../../constants/COLORS'

const CalorieTitle = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.colorieOrange, borderRadius: 9 }}>
                <img src={calorie} style={{ width: 16, height: 16 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.colorieOrange }}>{"卡路里"}</div>
        </div>
    )
}

export default CalorieTitle