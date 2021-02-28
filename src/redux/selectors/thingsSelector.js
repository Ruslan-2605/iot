const getDevice = (state) => {
    return state.things
}

export const getThings = (state) => {
    return getDevice(state).things
}
export const getPage = (state) => {
    return getDevice(state).page
}

// export const getDifficultDate = createSelector(select1, select2, (state1, state2) => {
//    return difficult data
//)}