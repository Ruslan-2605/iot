const getDevices = (state) => {
    return state.device
}

export const getThings = (state) => {
    return getDevices(state).things
}

export const getDevices = (state) => {
    return getProject(state).devices
}
// export const getDifficultDate = createSelector(select1, select2, (state1, state2) => {
//    return difficult data
//)}