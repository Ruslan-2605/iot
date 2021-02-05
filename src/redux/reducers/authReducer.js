import { authAPI } from "../../DAL/api";
import Cookies from 'js-cookie'

const initialState = {
    username: null,
    token: null,
    id: null, //нужно удалить 
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

export const setCookie = (authData) => {
    return (dispatch) => {
        dispatch(setAuthUserData(authData))
    }
}

export const deleteCookie = (username) => {
    return (dispatch) => {
        dispatch(setAuthUserData({ "username": null, "token": null, "isAuth": false }));
        Cookies.remove(username)
    }
}

// Redux-Thunk

export const signInThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signIn(authData);
            dispatch(setAuthUserData({ ...response, isAuth: true }));
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

