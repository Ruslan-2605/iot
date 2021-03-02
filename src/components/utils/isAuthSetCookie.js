import { setCookie } from "../../redux/reducers/authReducer";
import Cookies from 'js-cookie'

export const isAuthSetCookie = (isAuth, dispatch) => {
    if (!isAuth) {
        const authCookie = Cookies.get();
        if (authCookie.username && authCookie.token) {
            dispatch(setCookie(
                {
                    "username": authCookie.username,
                    "token": authCookie.token,
                    "isAuth": true
                }))
        }
    }
}