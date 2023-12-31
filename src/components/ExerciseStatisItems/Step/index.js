import step from '../../../Pic/run.png'
import COLORS from '../../../constants/COLORS'

const StepTitle = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                <img src={step} style={{ width: 16, height: 16 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>{"步数"}</div>
        </div>
    )
}

export default StepTitle