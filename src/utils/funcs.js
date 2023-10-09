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

export const secToMin = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // 使用字符串插值或字符串连接来构建格式化的时间字符串
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    return formattedTime;
}