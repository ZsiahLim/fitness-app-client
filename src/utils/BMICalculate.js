import { useIntl } from "react-intl";

//计算平均数
export const calculateBMI = (weight, height) => {//weight kg 身高 cm
    const convertedHeight = parseFloat(height) / 100
    const heightSquare = convertedHeight * convertedHeight;
    const BMI = parseFloat(weight) / heightSquare
    return parseFloat(BMI.toFixed(2));
}

export const BMISort = (bmi) => {
    const intl = useIntl()
    if (bmi < 18.5) {
        return intl.formatMessage({ id: 'app.stats.bmiSort.uw' });
    } else if (bmi >= 18.5 && bmi < 25) {
        return intl.formatMessage({ id: 'app.stats.bmiSort.nw' });
    } else if (bmi >= 25 && bmi <= 29.9) {
        return intl.formatMessage({ id: 'app.stats.bmiSort.ow' });
    } else {
        return intl.formatMessage({ id: 'app.stats.bmiSort.fa' });
    }
}
