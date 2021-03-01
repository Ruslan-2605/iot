import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
});


export const projectAPI = {

    getProjectPage(username, token, page) {
        return instance
            .get(`project/page?count=${page}&username=${username}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response.data
            })
    },

    createProject(projectForm, token) {
        return instance
            .post("project", projectForm, { 'headers': { 'Authorization': token } })
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

    updateProject(projectForm, token, id) {
        return instance
            .put(`project/${id}`, projectForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    getProject(id, token) {
        return instance
            .get(`project/${id}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    getPaginationInfo(username, token) {
        return instance
            .get(`project/pagination?username=${username}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

};
