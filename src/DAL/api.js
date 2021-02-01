import * as axios from "axios";

let instance = axios.create({
    // headers: {
    //     "API-KEY": "",
    // },
    baseURL: "http://localhost:8080/",
});

export const authAPI = {

    signIn(authData) {

        return instance
            .post('auth/signIn', authData)
            .then((response) => response.data)

    },
    signUp(authData) {
        return instance
            .post("auth/signUp", authData)
            .then((response) => response.data);
    },
};