import * as axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export const deviceAPI = {

    getThings(id, page, token) {
        return instance
            .get(`/project/thing/page/${id}?count=${page}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    createDevice(deviceForm, token) {
        return instance
            .post(`device`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    updateDevice(deviceForm, token, id) {
        return instance
            .put(`device/${id}`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    deleteDevice(id, token) {
        return instance
            .delete(`device/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },

    getState(state, token) {
        return instance
            .get(`/deviceState/${token}?state=${state}`)
            .then((response) => response.data);
    },

    setState(state, token) {
        return instance
            .post(`/deviceState/${token}?state=${state}`)
            .then((response) => response.data);
    },

};