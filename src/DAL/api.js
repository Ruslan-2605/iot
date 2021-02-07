import * as axios from "axios";
import Cookies from 'js-cookie'

let instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export const authAPI = {

    signIn(authData) {

        return instance
            .post('auth/signIn', authData)
            .then((response) => {
                if (response.status === 200) {
                    Cookies.set("username", response.data.username);
                    Cookies.set("token", response.data.token);
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

export const projectAPI = {
    getProjectPage(username, token, page) {
        return instance
            .get(`project/page?count=${page}&username=${username}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response.data
            })
    },
    createProject(projectData, token) {
        return instance
            .post("project", projectData, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },
    deleteProject(id, token) {
        return instance
            .delete(`project/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },
    updateProject(projectData, token, id) {
        return instance
            .put(`project/${id}`, projectData, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },
};