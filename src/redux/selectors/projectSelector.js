const getProject = (state) => {
    return state.project
}

export const getActivePage = (state) => {
    return getProject(state).page
}

export const getProjects = (state) => {
    return getProject(state).projects
}
export const getIconSelected = (state) => {
    return getProject(state).iconSelected
}
export const getCountPage = (state) => {
    return getProject(state).countPage
}
export const getProjectViewed = (state) => {
    return getProject(state).projectViewed
}

// export const getDifficultDate = createSelector(select1, select2, (state1, state2) => {
//    return difficult data
//)}