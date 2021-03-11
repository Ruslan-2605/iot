import * as axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export const deviceAPI = {

    getThings(id, page, token) {
        return instance
            .get(`/pagination/thing/${id}/${page}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    createDevice(deviceForm, token) {
        return instance
            .post(`crud/device`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    updateDevice(deviceForm, token, id) {
        return instance
            .put(`crud/device/${id}`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    deleteDevice(id, token) {
        return instance
            .delete(`crud/device/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },

    setState(state, token) {
        return instance
            .post(`deviceState/${token}?state=${state}`)
            .then((response) => response.data);
    },

};