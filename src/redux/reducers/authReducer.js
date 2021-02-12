import { authAPI } from "../../DAL/api";
import Cookies from 'js-cookie'

const initialState = {
    username: null,
    token: null,
    tokenValidity: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                ...action.data,
            };

        case "LOGOUT":
            return initialState;

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

export const logoutActionCreator = () => {
    return {
        type: "LOGOUT",
    };
};

export const setCookie = (authData) => {
    return (dispatch) => {
        dispatch(setAuthUserData(authData))
    }
}

export const logout = (names) => {
    return (dispatch) => {
        dispatch(logoutActionCreator());
        names.map(
            (name) => {
                Cookies.remove(name);
            }
        );
    }
}

// Redux-Thunk

export const signInThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signIn(authData);
            dispatch(setAuthUserData({ ...response, isAuth: true }));
        } catch (error) {
            // Check http server response error
            if (error.response.data) {
                setError(error.response.data.field, {
                    type: error.response.status,
                    message: error.response.data.message
                });
            } else {
                // Set stack error
                setError("error", {
                    type: error.toJSON().name,
                    message: error.toJSON().message
                });
            }

        }
    };
};

export const signUpThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signUp(authData);
            dispatch(setAuthUserData(response));
        } catch (error) {
            // Check http server response error
            if (error.response.data) {
                setError(error.response.data.field, {
                    type: error.response.status,
                    message: error.response.data.message
                });
            } else {
                // Set stack error
                setError("error", {
                    type: error.toJSON().name,
                    message: error.toJSON().message
                });
            }
        }

    };
};

