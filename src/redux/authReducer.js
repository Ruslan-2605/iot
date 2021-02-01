import { authAPI } from "../DAL/api";

let initialState = {
    username: null,
    token: null,
    userId: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                ...action.data,
            };

        default:
            return state;
    }
};

export const setAuthUserData = (authData) => {
    return {
        type: "SET-AUTH-USER-DATA",
        data: authData,
    };
};

export const signInThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signIn(authData);
            dispatch(setAuthUserData(response));
        } catch (error) {
            setError("error", {
                type: error.toJSON().name,
                message: error.toJSON().message
            });
        }
    };
};

export const signUpThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signUp(authData);
            dispatch(setAuthUserData(response));
        } catch (error) {
            setError("error", {
                type: error.toJSON().name,
                message: error.toJSON().message
            });
        }

    };
};

