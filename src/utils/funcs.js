//计算平均数
export const calculateAverage = (arr) => {
    // 确保数组不为空
    if (arr.length === 0) {
        return 0;
    }
    // 计算数组中所有元素的总和
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // 计算平均数
    const average = sum / arr.length;
    return average;
}