const getProject = (state) => {
    return state.projects
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
export const getPaginationInfo = (state) => {
    return getProject(state).paginationInfo
}
export const getProjectViewed = (state) => {
    return getProject(state).projectViewed
}
