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
import { useIntl } from 'react-intl';

export default function EvaluatePage() {
    const intl = useIntl()
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
                    message.success(intl.formatMessage({id: 'app.tut.msg.submitEva'}))
                } else {
                    message.error(intl.formatMessage({id: 'error.errorMsg'}))
                }
            }).catch(() => {
                message.error(intl.formatMessage({id: 'error.errorMsg'}))
            })
        } else {
            message.error(intl.formatMessage({id: 'error.tut.noEvaSele'}))
        }
    }
    return (
        <div className={`App ${lightAppClassname}`}>
            <div className={`myDashboard ${lightDashboardClassname}`}>
                <div className="evaluatePage-mainContent">
                    <div className="evaluatePage-header">
                        <div className="backHomeBtn" onClick={() => navigateTo(-1)} style={{ color: COLORS.black }}><LeftOutlined />&nbsp;{intl.formatMessage({id: 'btn.back'})}</div>
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
                            <div style={{ color: COLORS.white, fontWeight: 'bold' }}>{intl.formatMessage({id: 'btn.nextQ'})}</div>
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
                                <div style={{ color: COLORS.white, fontWeight: 'bold' }}>{intl.formatMessage({id: 'btn.submitQ'})}</div>
                            </div>}
                        <div></div>
                    </div>
                </div>
            </div>
        </div >
    )
}
