export const checkIsToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();
};

export const checkTwoDaysIsEqual = (Date1, Date2) => {
    return Date1.getDate() === Date2.getDate() &&
        Date1.getMonth() === Date2.getMonth() &&
        Date1.getFullYear() === Date2.getFullYear();
};