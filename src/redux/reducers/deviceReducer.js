import { deviceFormHelper } from "../../components/utils/DeviceFormHelper";
import { setErrorInThunk } from "../../components/utils/setErrorInThunk";
import { updateObjectArray } from "../../components/utils/updateObjectArray";
import { deviceAPI } from "../../DAL/deviceAPI";

const SET_THINGS = "SET-THINGS";
const CREATE_DEVICE = "CREATE-DEVICE";
const UPDATE_DEVICE = "UPDATE-DEVICE";
const SET_PAGE = "SET-PAGE";
const LOGOUT = "LOGOUT";

const initialState = {
    things: [],
    page: 1,
};

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_THINGS:
            return {
                ...state,
                things: action.data,
            };

        case CREATE_DEVICE:
            return {
                ...state,
                things: [
                    ...state.things,
                    {
                        "type": "device",
                        "entity": {
                            ...action.data
                        }
                    },
                ],
            };

        case UPDATE_DEVICE:
            return {
                ...state,
                things: state.things.map((thing) => {
                    switch (thing.type === "device") {
                        case thing.entity.id === action.data.id:
                            return { ...thing, ...{ "entity": { ...action.data } } }
                        default:
                            return thing;
                    }
                })
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.data,
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

const createDevice = (response) => {
    return {
        type: "CREATE-DEVICE",
        data: response
    }
}

const updateDevice = (device) => {
    return {
        type: "UPDATE-DEVICE",
        data: device
    }
}

const setPage = (page) => {
    return {
        type: "SET-PAGE",
        data: page
    }
}

// ActionCreator
export const setPageActionCreator = (page) => {
    return async (dispatch) => {
        dispatch(setPage(page));
    };
}
// Redux-Thunk

//Get Things Array

export const getThingsPageThunkCreator = (id, page, token) => {
    return async (dispatch) => {
        try {
            //id of project
            const response = await deviceAPI.getThings(id, page, token);
            dispatch(setThings(response))
        } catch (error) {
            // ERROR
        }
    };
};


//Device CRUD

export const createDeviceThunkCreator = (deviceForm, project, token, thingsLength, setError) => {
    deviceForm = deviceFormHelper(deviceForm, project)
    return async (dispatch) => {
        try {
            const response = await deviceAPI.createDevice(deviceForm, token);
            if (thingsLength < 10) {
                //10 - максимальное количество проектов на странице
                dispatch(createDevice(response))
            }
        } catch (error) {
            setErrorInThunk(error, setError);
        }
    };
};

export const updateDeviceThunkCreator = (deviceForm, token, project, id, setError) => {
    deviceForm = deviceFormHelper(deviceForm, project)
    return async (dispatch) => {
        try {
            const response = await deviceAPI.updateDevice(deviceForm, token, id);
            dispatch(updateDevice(response))
        } catch (error) {
            setErrorInThunk(error, setError);
        }
    };
};

export const deleteDeviceThunkCreator = (id, page, project, token) => {
    return async (dispatch) => {
        try {
            const response = await deviceAPI.deleteDevice(id, token);
            dispatch(getThingsPageThunkCreator(project, page, token))
        } catch (error) {
            // ERROR
        }
    };
};