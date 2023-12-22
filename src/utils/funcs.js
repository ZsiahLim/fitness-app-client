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
export const secToSpecificMin = (seconds) => {
    const minutes = Math.round(seconds / 60);
    // 使用字符串插值或字符串连接来构建格式化的时间字符串
    const formattedTime = `${minutes}`;

    return formattedTime;
}
export const secConvertToMin = (seconds) => {
    const minutes = parseFloat((seconds / 60).toFixed(1));
    // 使用字符串插值或字符串连接来构建格式化的时间字符串
    return minutes;
}

export const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isAfterToday = (timestamp) => {
    // 创建一个代表给定时间戳的Date对象
    const givenDate = new Date(timestamp);

    // 获取今天的日期（年月日）并将时间设置为午夜（00:00:00）
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 比较两个日期的时间戳
    return givenDate.getTime() > today.getTime();
}