import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SIZE from '../../constants/SIZE'
import COLORS from '../../constants/COLORS'

const EvaluationQuestion = ({ questionNo, EvaluationItem, setEvaluationAnswer }) => {
    const { question, answers, type, id } = EvaluationItem
    const { currentUser } = useSelector(state => state.user)
    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [selectedIndex, setSelectedIndex] = useState()

    const handleSelectAnswer = (answer, index) => {
        setSelectedIndex(index)
        selectedAnswer[type] = answer.value
        const finalAnswer = selectedAnswer
        setEvaluationAnswer(prev => {
            return { ...prev, ...finalAnswer }
        })
    }
    if (questionNo === id) {
        return (
            <div style={{ margin: '16px 0' }}>
                <div style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: SIZE.LargerMargin
                }}>
                    {currentUser.preferedLanguage === 'en_US' ? question.en : question.zh}
                </div>
                {answers.map(
                    (answer, index) =>
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                padding: "10px",
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: selectedIndex === index ? COLORS.primary : COLORS.white,
                                marginBottom: SIZE.LargerMargin,
                                borderRadius: SIZE.CardBorderRadius
                            }}
                            onClick={() => handleSelectAnswer(answer, index)}
                        >
                            <div style={{
                                fontSize: SIZE.NormalTitle,
                                color: selectedIndex === index ? COLORS.white : COLORS.commentText,
                                fontWeight: 'bold'
                            }}>
                                {currentUser.preferedLanguage === 'en_US' ? answer.en : answer.zh}
                            </div>
                        </div>
                )}
            </div>
        )
    } else {
        return <></>
    }

}

export default EvaluationQuestion