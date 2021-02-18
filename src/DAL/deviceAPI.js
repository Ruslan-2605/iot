import * as axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export const deviceAPI = {

    getThings(id, token) {
        return instance
            .get(`thing/${id}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    getDevice(id, token) {
        return instance
            .get(`device/${id}`, { 'headers': { 'Authorization': token } })
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

};