//计算平均数
export const calculateBMI = (weight, height) => {//weight kg 身高 cm
    const convertedHeight = parseFloat(height) / 100
    const heightSquare = convertedHeight * convertedHeight;
    const BMI = parseFloat(weight) / heightSquare
    return parseFloat(BMI.toFixed(2));
}

export const BMISort = (bmi) => {
    if (bmi < 18.5) {
        return '体重过轻';
    } else if (bmi >= 18.5 && bmi < 25) {
        return '正常范围';
    } else if (bmi >= 25 && bmi <= 29.9) {
        return '超重';
    } else {
        return '肥胖';
    }
}
