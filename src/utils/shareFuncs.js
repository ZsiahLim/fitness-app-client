import { message } from "antd";

const shareBlog = async (id, successMsg, errMsg) => {
    const originUrl = window.location.origin;
    const wholeUrl = originUrl + '/specificblog/' + id;
    await navigator.clipboard.writeText(wholeUrl).then(res => {
        message.success(successMsg)
    }).catch(err => {
        message.error(errMsg)
    })
}

const shareTutorial = async (id, successMsg, errMsg) => {
    const originUrl = window.location.origin;
    const wholeUrl = originUrl + '/specifictutorial/' + id;
    await navigator.clipboard.writeText(wholeUrl).then(res => {
        message.success(successMsg)
    }).catch(err => {
        message.error(errMsg)
    })
}

export { shareBlog, shareTutorial }