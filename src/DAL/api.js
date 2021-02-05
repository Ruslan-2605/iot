import { debounce } from "@material-ui/core";
import * as axios from "axios";
import Cookies from 'js-cookie'

let instance = axios.create({
    headers: {
        "withCredentials": true
    },
    baseURL: "http://localhost:8080/",
});

export const authAPI = {

    signIn(authData) {

        return instance
            .post('auth/signIn', authData)
            .then((response) => {
                if (response.status === 200) {
                    Cookies.set(response.data.username, response.data.token);
                };
                return response.data
            })

    },
    signUp(authData) {
        return instance
            .post("auth/signUp", authData)
            .then((response) => response.data);
    },
};