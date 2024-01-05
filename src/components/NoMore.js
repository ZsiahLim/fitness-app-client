import COLORS from "../constants/COLORS"
import { useIntl } from "react-intl"

const NoMore = () => {
    const intl = useIntl()
    return <div
        style={{ display: 'flex', justifyContent: 'center', fontSize: 12, color: COLORS.commentText }}
    >
        {intl.formatMessage({ id: 'msg.noMore' })}
    </div>
}

export default NoMore