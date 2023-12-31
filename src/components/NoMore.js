import COLORS from "../constants/COLORS"

const NoMore = () => {
    return <div
        style={{ display: 'flex', justifyContent: 'center', fontSize: 12, color: COLORS.commentText }}
    >
        --没有更多内容了--
    </div>
}

export default NoMore