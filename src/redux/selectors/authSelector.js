const getAuth = (state) => {
    return state.auth
}

export const getIsAuth = (state) => {
    return getAuth(state).isAuth
}

export const getUserName = (state) => {
    return getAuth(state).username
}

export const getUserToken = (state) => {
    return getAuth(state).token
}

export const getUserId = (state) => {
    return getAuth(state).id
}

// export const getDifficultDate = createSelector(select1, select2, (state1, state2) => {
//    return difficult data
//)}