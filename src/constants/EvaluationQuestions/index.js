import EXERCISETYPE from "../EXERCISETYPE"
const level = {
    beginner: "l1",
    medium: 'l2',
    advanced: 'l3'
}
const ANSWER = {
    goal: {
        burning: {
            en: "Lose Weight",
            zh: "减肥",
            value: EXERCISETYPE.burning.value
        },
        strength: {
            en: "Strength",
            zh: "增肌",
            value: EXERCISETYPE.strength.value
        },
        yoga: {
            en: "Do yoga to stay healthy and fit",
            zh: "练瑜伽保持健康塑身",
            value: EXERCISETYPE.yoga.value
        },
        anyway: {
            en: "Just have look",
            zh: "随便练练",
            value: null
        },
    },
    level: {
        beginner: {
            en: "Beginner",
            zh: "初级入门水平",
            value: level.beginner
        },
        medium: {
            en: "Medium",
            zh: "中级水平",
            value: level.medium
        },
        advanced: {
            en: "Advanced",
            zh: "高级",
            value: level.advanced
        },
    },
    frequency: {
        five: {
            en: "Less than 5 times",
            zh: "少于五次",
            value: {
                lowRangeValue: 0,
                higherRangeValue: 5
            },
        },
        ten: {
            en: "Less than 10 times",
            zh: "少于十次",
            value: {
                lowRangeValue: 5,
                higherRangeValue: 10
            },
        },
        more: {
            en: "more than 10 times",
            zh: "多于十次",
            value: {
                lowRangeValue: 10,
                higherRangeValue: 20
            },
        }
    },
    duration: {
        ten: {
            en: "Less than 10 min",
            zh: "少于10分钟",
            value: {
                lowRangeValue: 0,
                higherRangeValue: 10
            },
        },
        tenMore: {
            en: "More than 10 Less than 20 min",
            zh: "10到20分钟",
            value: {
                lowRangeValue: 10,
                higherRangeValue: 15
            },
        },
        twentyMore: {
            en: "More than 15 min",
            zh: "多于15分钟",
            value: {
                lowRangeValue: 15,
                higherRangeValue: 100
            },
        }
    },
    calorie: {
        ten: {
            en: "Less than 10 kcal",
            zh: "少于10千卡",
            value: {
                lowRangeValue: 0,
                higherRangeValue: 10
            },
        },
        tenMore: {
            en: "More than 10 Less than 50 kcl",
            zh: "十到五十千卡",
            value: {
                lowRangeValue: 10,
                higherRangeValue: 50
            },
        },
        twentyMore: {
            en: "more than 50 kcal",
            zh: "多于五十千卡",
            value: {
                lowRangeValue: 50,
                higherRangeValue: 1000
            },
        }
    },
}

const EvaluationQuestions = [
    {
        id: 1,
        type: "goal",
        question: { zh: "您的健身目标是什么？", en: "What are your fitness goals?" },
        answers: [ANSWER.goal.burning, ANSWER.goal.strength, ANSWER.goal.yoga, ANSWER.goal.anyway]
    },
    {
        id: 2,
        type: "level",
        question: { zh: "您的健身水平如何？", en: "What are your fitness level?" },
        answers: [ANSWER.level.beginner, ANSWER.level.medium, ANSWER.level.advanced]
    },
    {
        id: 3,
        type: "frequency",
        question: { zh: "您每周计划锻炼多少次？", en: "How many times a week do you plan to exercise?" },
        answers: [ANSWER.frequency.five, ANSWER.frequency.ten, ANSWER.frequency.more]
    },
    {
        id: 4,
        type: "duration",
        question: { zh: "您希望每次锻炼的时长是多少？", en: "How long do you want each workout to last??" },
        answers: [ANSWER.duration.ten, ANSWER.duration.tenMore, ANSWER.duration.twentyMore]
    },
    {
        id: 5,
        type: "calorie",
        question: { zh: "您希望每次锻炼消耗多少卡路里？", en: "How many calories do you want to burn per workout?" },
        answers: [ANSWER.calorie.ten, ANSWER.calorie.tenMore, ANSWER.calorie.twentyMore]
    },
]

export default EvaluationQuestions