import { updateObjectArray } from "../../components/utils/updateObjectArray";
import { deviceAPI } from "../../DAL/deviceAPI";

const SET_THINGS = "SET-THINGS";
const SET_DEVICE = "SET-DEVICE";
const UPDATE_DEVICE = "UPDATE-DEVICE";
const DELETE_DEVICE = "DELETE-DEVICE";
const LOGOUT = "LOGOUT";

const initialState = {
    things: [],
    devices: [],
};

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_THINGS:
            return {
                ...state,
                things: action.data,
            };

        case SET_DEVICE:
            return {
                ...state,
                devices: [
                    ...state.devices,
                    action.data,
                ],
            };

        case UPDATE_DEVICE:
            return {
                ...state,
                devices: updateObjectArray(state.devices, action.data.id, "id", action.data)
            };

        case DELETE_DEVICE:
            return {
                ...state,
                devices: updateObjectArray(state.devices, action.data, "id", null)//требует проверки
            };


        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
// Action

const setThings = (things) => {
    return {
        type: "SET-THINGS",
        data: things
    }
}

const setDevice = (device) => {
    return {
        type: "SET-DEVICE",
        data: device
    }
}

const updateDevice = (device) => {
    return {
        type: "UPDATE-DEVICE",
        data: device
    }
}

const deleteDevice = (id) => {
    return {
        type: "DELETE-DEVICE",
        data: id
    }
}

// ActionCreator


// Redux-Thunk

//Get Things Array

export const getThingsThunkCreator = (id, token) => {
    debugger
    return async (dispatch) => {
        try {
            //id of project
            const response = await deviceAPI.getThings(id, token);
            dispatch(setThings(response))
        } catch (error) {
            console.log(error)
        }
    };
};


//Device CRUD

export const getDeviceThunkCreator = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await deviceAPI.getDevice(id, token);
            dispatch(setDevice(response))
        } catch (error) {
            // ERROR
        }
    };
};

export const createDeviceThunkCreator = (deviceForm, token) => {
    return async (dispatch) => {
        try {
            const response = await deviceAPI.createDevice(deviceForm, token);
            dispatch(setDevice(response))
        } catch (error) {
            // ERROR
        }
    };
};

export const updateDeviceThunkCreator = (deviceForm, token, id) => {
    return async (dispatch) => {
        try {
            const response = await deviceAPI.updateDevice(deviceForm, token, id);
            dispatch(updateDevice(response))
        } catch (error) {
            // ERROR
        }
    };
};

export const deleteDeviceThunkCreator = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await deviceAPI.deleteDevice(id, token);
            dispatch(deleteDevice(id))
        } catch (error) {
            // ERROR
        }
    };
};