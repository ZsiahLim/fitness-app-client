import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import './index.less'
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import EvaluationQuestions from "../../constants/EvaluationQuestions";
import EvaluationQuestion from "./EvaluationQuestion";
import { updatePrefer } from "../../api/user.api";
import { loginSuccess } from "../../redux/userSlice";
import { message } from "antd";
import SIZE from "../../constants/SIZE";
import COLORS from "../../constants/COLORS";

export default function EvaluatePage() {
    const dispatch = useDispatch()
    const { currentTheme } = useSelector((state) => state.user)
    const lightAppClassname = currentTheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currentTheme === 'light' ? 'myDashboard-light' : ''
    const [questionNo, setQuestionNo] = useState(1)
    const [EvaluationAnswer, setEvaluationAnswer] = useState({})
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const handleNextQuestion = () => {
        const prevNo = questionNo;
        console.log(questionNo);
        if (prevNo === EvaluationQuestions.length - 1) {
            setQuestionNo(prevNo + 1)
            setIsLastQuestion(true);
        } else {
            setQuestionNo(prevNo + 1)
        }
    }
    const navigateTo = useNavigate()

    const handleSubmitEvaluation = async () => {
        const isEmpty = Object.keys(EvaluationAnswer).length === 0;
        if (!isEmpty) {
            await updatePrefer({ evaluationAnswer: EvaluationAnswer }).then((user) => {
                if (user.status !== false) {
                    dispatch(loginSuccess(user))
                    navigateTo(-1)
                    message.success('已经提交评估，将为您生成个性化推荐')
                } else {
                    message.error('出现异常, 请稍后再试')
                }
            }).catch(() => {
                message.error('出现异常, 请稍后再试')
            })
        } else {
            message.error('您未作出选择, 无法为您更新')
        }
    }
    return (
        <div className={`App ${lightAppClassname}`}>
            <div className={`myDashboard ${lightDashboardClassname}`}>
                <div className="evaluatePage-mainContent">
                    <div className="evaluatePage-header">
                        <div className="backHomeBtn" onClick={() => navigateTo(-1)} style={{ color: COLORS.black }}><LeftOutlined />&nbsp;Back</div>
                        <div className="progress">
                            <div className="progressBar"><div className="progressBar-item" style={{ width: `${questionNo * (1 / EvaluationQuestions.length) * 100}%` }}></div></div>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
                        {EvaluationQuestions.map((item, index) => <EvaluationQuestion key={index} questionNo={questionNo} EvaluationItem={item} setEvaluationAnswer={setEvaluationAnswer} />)}
                        {!isLastQuestion ? <div
                            style={{
                                display: 'flex',
                                borderRadius: SIZE.CardBorderRadius,
                                padding: '10px 40px',
                                backgroundColor: COLORS.green,
                                gap: 6
                            }}
                            onClick={() => {
                                handleNextQuestion()
                            }}
                        >
                            <div style={{ color: COLORS.white, fontWeight: 'bold' }}>Next question</div>
                            <RightOutlined style={{ color: COLORS.white }} />
                        </div>
                            : <div
                                style={{
                                    display: 'flex',
                                    borderRadius: SIZE.CardBorderRadius,
                                    padding: '10px 40px',
                                    backgroundColor: COLORS.primary,
                                    gap: 6
                                }}
                                onClick={() => handleSubmitEvaluation()}>
                                <div style={{ color: COLORS.white, fontWeight: 'bold' }}>提交评估</div>
                            </div>}
                        <div></div>
                    </div>
                </div>
            </div>
        </div >
    )
}
