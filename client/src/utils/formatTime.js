export const FormattedTime = (Date) => {
    // Get the individual components of the date and time
    const year = Date.getFullYear();
    const month = Date.getMonth() + 1;
    const day = Date.getDate();
    const hours = Date.getHours();
    const minutes = Date.getMinutes();
    // Format the components into a readable time string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}