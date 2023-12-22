import { message } from "antd";

const shareBlog = async (id) => {
    const originUrl = window.location.origin;
    const wholeUrl = originUrl + '/specificblog/' + id;
    await navigator.clipboard.writeText(wholeUrl).then(res => {
        message.success('已经复制到您的剪切板,发送给好友分享吧～')
    }).catch(err => {
        message.error('Failed to copy')
    })
}

const shareTutorial = async (id) => {
    const originUrl = window.location.origin;
    const wholeUrl = originUrl + '/specifictutorial/' + id;
    await navigator.clipboard.writeText(wholeUrl).then(res => {
        message.success('已经复制到您的剪切板,发送给好友分享吧～')
    }).catch(err => {
        message.error('Failed to copy')
    })
}

export { shareBlog, shareTutorial }