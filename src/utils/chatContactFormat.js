
export const formatDateTime = (dateTime) => {
    const now = new Date();
    const targetDate = new Date(dateTime);

    // 判断是否是今天
    if (isSameDay(now, targetDate)) {
        return formatTime(targetDate);
    }

    // 判断是否是昨天
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(yesterday, targetDate)) {
        return "Yesterday  " + formatTime(targetDate);
    }

    // 判断是否是本周内
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
    if (targetDate >= startOfWeek && targetDate <= endOfWeek) {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekdayIndex = targetDate.getDay();
        return weekdays[weekdayIndex];
    }

    // 其他情况返回日期格式
    return formatDate(targetDate);
}

// 判断两个日期是否是同一天
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

// 格式化时间为 hh:mm
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// 格式化日期为 dd/mm/yy
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}