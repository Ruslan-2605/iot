export const lastActive = (data) => {
    const dateNow = Date.now() / 1000
    const activity = data / 1000
    let time = Math.round((dateNow - activity) / 60)
    if ((1440 > time && time > 60)) {
        time = Math.round(time / 60)
        return `${time} hours ago`
    } else if (time > 1440) {
        time = Math.round(time / 60 / 24)
        return `${time} day ago`
    } else if (time < 5) {
        return `was recently active`
    } else {
        return `${time} minutes ago`
    }
}
