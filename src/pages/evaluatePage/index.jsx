import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import './index.less'
import { useState } from "react";
import CardTitle from '../../components/CardTitle'
import { LeftOutlined } from "@ant-design/icons";

export default function EvaluatePage() {
    const { currentTheme } = useSelector((state) => state.user)
    const lightAppClassname = currentTheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currentTheme === 'light' ? 'myDashboard-light' : ''
    const [selectPageNum, setSelectPageNum] = useState(1)
    const navigateTo = useNavigate()
    return (
        <div className={`App ${lightAppClassname}`}>
            <div className={`myDashboard ${lightDashboardClassname}`}>
                <div className="header">
                    <div className="backHomeBtn" onClick={() => navigateTo(-1)}><LeftOutlined />&nbsp;Back</div>
                    <div className="progress">
                        <div className="progressBar"><div className="progressBar-item" style={{ width: `${selectPageNum * 12.5}%` }}></div></div>
                    </div>
                </div>
                {selectPageNum === 1 && <div className="questionCard">
                    <div className="questionCard-title"><CardTitle title={"基础信息"} /></div>
                    <div className="questionCard-description">确认你的身份信息</div>
                    <div className="questionCard-detail">体型月解禁真是的自己，能匹配更合适你的运动</div>
                    <div className="questionCard-mainForm">
                        体重 身高 伤病
                    </div>
                    <div className="questionCard-submitBtn" onClick={() => setSelectPageNum((selectPageNum + 1))}>
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 2 && <div className="questionCard">
                    <div className="questionCard-title"><CardTitle title={"运动偏好"} /></div>
                    <div className="questionCard-description">你希望在基础训练外，增加哪些运动类型</div>
                    {/* <div className="questionCard-detail">体型月解禁真是的自己，能匹配更合适你的运动</div> */}
                    <div className="questionCard-mainForm">
                        跳绳 操课
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 3 && <div className="questionCard">
                    <div className="questionCard-title"><CardTitle title={"运动偏好"} /></div>
                    <div className="questionCard-description">运动多久</div>
                    <div className="questionCard-mainForm">
                        20 30 40
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 4 && <div className="questionCard">
                    <div className="questionCard-title">运动偏好3</div>
                    <div className="questionCard-description">运动器械</div>
                    <div className="questionCard-mainForm">
                        哑铃，弹力带，。。。。
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 5 && <div className="questionCard">
                    <div className="questionCard-title">运动能力</div>
                    <div className="questionCard-description">你单次跑步的最远距离是多少</div>
                    <div className="questionCard-mainForm">
                        《3 3-4 5-7 》7
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 6 && <div className="questionCard">
                    <div className="questionCard-title">运动能力2</div>
                    <div className="questionCard-description">你可以连续完成多少个俯卧撑</div>
                    <div className="questionCard-mainForm">
                        0 10 10-20 20-30 30》
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 7 && <div className="questionCard">
                    <div className="questionCard-title">运动能力3</div>
                    <div className="questionCard-description">你可以连续完成多少个标准深蹲</div>
                    <div className="questionCard-mainForm">
                        10 10-20 20-30 30-40 40》
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 8 && <div className="questionCard">
                    <div className="questionCard-title">运动能力4</div>
                    <div className="questionCard-description">你可以连续完成多少个标准卷腹</div>
                    <div className="questionCard-mainForm">
                        10 10-20 20-30 30-40 40》
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
                {selectPageNum === 9 && <div className="resultpage">
                    <div className="questionCard-title">为你推荐</div>
                    <div>重新定制</div>
                    <div>训练难度</div>
                    <div>有氧无氧占比</div>
                    <div>bmi指数</div>
                    <div className="questionCard-mainForm">
                        10 10-20 20-30 30-40 40》
                    </div>
                    <div className="questionCard-submitBtn">
                        下一个问题
                    </div>
                </div>}
            </div>
        </div >
    )
}
