import { authAPI } from "../../DAL/authAPI";
import Cookies from 'js-cookie'
import { setErrorInThunk } from "../../components/utils/setErrorInThunk";

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";
const LOGOUT = "LOGOUT";

const initialState = {
    username: null,
    token: null,
    tokenValidity: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
            };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};

//Action
export const setAuthUserData = (authData) => {
    return {
        type: "SET-AUTH-USER-DATA",
        data: authData,
    };
};

export const logoutAction = () => {
    return {
        type: "LOGOUT",
    };
};

//Action Creator

export const setCookie = (authData) => {
    return (dispatch) => {
        dispatch(setAuthUserData(authData))
    }
}

export const logout = (names) => {
    return (dispatch) => {
        dispatch(logoutAction());
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
            setErrorInThunk(error, setError);
        }
    };
};

export const signUpThunkCreator = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signUp(authData);
            dispatch(setAuthUserData(response));
        } catch (error) {
            setErrorInThunk(error, setError);
        }

    };
};

