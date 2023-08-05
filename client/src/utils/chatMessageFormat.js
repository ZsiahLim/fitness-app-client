export const FormatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    // 检查是否为今天
    if (isSameDay(date, now)) {
        return formatTime(date); // 返回时间（几点几分）
    }

    // 检查是否为昨天
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(date, yesterday)) {
        return 'Yesterday ' + formatTime(date); // 返回 '昨天 几点几分'
    }

    // 检查是否为本周内的日期
    const thisWeek = new Date(now);
    thisWeek.setDate(now.getDate() - now.getDay());
    if (date >= thisWeek) {
        return getWeekday(date); // 返回周几
    }

    // 返回日期（dd/mm/yy）加几点几分的形式
    return formatDate(date) + ' ' + formatTime(date);
}

// 检查两个日期是否为同一天
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

// 返回时间（几点几分）格式化
function formatTime(date) {
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

// 返回日期（dd/mm/yy）格式化
function formatDate(date) {
    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}

// 返回周几
function getWeekday(date) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
}

// 添加前导零
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}