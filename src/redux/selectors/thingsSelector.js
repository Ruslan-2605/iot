const getDevice = (state) => {
    return state.things
}

export const getThings = (state) => {
    return getDevice(state).things
}
export const getPage = (state) => {
    return getDevice(state).page
}
