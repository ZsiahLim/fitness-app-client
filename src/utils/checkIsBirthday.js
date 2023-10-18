export const checkIsBirthday = (birthdayStr) => {
    const today = new Date();

    // 指定的生日日期（假设为 "2023-09-21T11:39:16.110Z"）
    const birthday = new Date(birthdayStr);

    // 提取月份和日期
    const todayMonth = today.getMonth() + 1; // 月份从 0 开始，所以加 1
    const todayDate = today.getDate();

    const birthdayMonth = birthday.getMonth() + 1; // 月份从 0 开始，所以加 1
    const birthdayDate = birthday.getDate();

    // 比较月份和日期部分
    if (todayMonth === birthdayMonth && todayDate === birthdayDate) {
        return true
    } else {
        return false
    }

}