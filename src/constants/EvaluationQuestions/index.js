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
        anyway: {
            en: "Don't Know",
            zh: "不清楚",
            value: null
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
        },
        anyway: {
            en: "No limit",
            zh: "随便练练",
            value: null
        },
    },
    duration: {
        fifteen: {
            en: "Less than 15 mins",
            zh: "少于15分钟",
            value: {
                lowRangeValue: 0,
                higherRangeValue: 15
            },
        },
        fifteenMore: {
            en: "More than 15 mins",
            zh: "大于15分钟",
            value: {
                lowRangeValue: 15,
                higherRangeValue: 100
            },
        },
        anyway: {
            en: "No limit",
            zh: "都可以",
            value: null
        },
    },
    calorie: {
        twenty: {
            en: "Less than 20 kcal",
            zh: "少于20千卡",
            value: {
                lowRangeValue: 0,
                higherRangeValue: 20
            },
        },
        twentyMore: {
            en: "more than 20 kcal",
            zh: "多于20千卡",
            value: {
                lowRangeValue: 20,
                higherRangeValue: 1000
            },
        },
        anyway: {
            en: "No limit",
            zh: "都可以",
            value: null
        },
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
        answers: [ANSWER.level.beginner, ANSWER.level.medium, ANSWER.level.advanced, ANSWER.level.anyway]
    },
    {
        id: 3,
        type: "frequency",
        question: { zh: "您每周计划锻炼多少次？", en: "How many times a week do you plan to exercise?" },
        answers: [ANSWER.frequency.five, ANSWER.frequency.ten, ANSWER.frequency.more, ANSWER.frequency.anyway]
    },
    {
        id: 4,
        type: "duration",
        question: { zh: "您希望每次锻炼的时长是多少？", en: "How long do you want each workout to last??" },
        answers: [ANSWER.duration.fifteen, ANSWER.duration.fifteenMore, ANSWER.duration.anyway]
    },
    {
        id: 5,
        type: "calorie",
        question: { zh: "您希望每次锻炼消耗多少卡路里？", en: "How many calories do you want to burn per workout?" },
        answers: [ANSWER.calorie.twenty, ANSWER.calorie.twentyMore, ANSWER.calorie.anyway]
    },
]

export default EvaluationQuestions