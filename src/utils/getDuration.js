export const getElapsedTime = (startTime) => {
    const now = new Date();
    let elapsed = now - startTime; // 毫秒数
    return elapsed
};

export const getElapsedMinute = (startTime) => {
    const now = new Date();
    let elapsed = now - startTime; // 毫秒数
    let minutes = Math.floor(elapsed / (1000 * 60));
    return minutes
};

export const formatElapsedTime = (elapsed) => {
    let hours = Math.floor(elapsed / (1000 * 60 * 60));
    elapsed -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(elapsed / (1000 * 60));
    elapsed -= minutes * 1000 * 60;
    let seconds = Math.floor(elapsed / 1000);
    const pad = (number) => (number < 10 ? `0${number}` : number);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

