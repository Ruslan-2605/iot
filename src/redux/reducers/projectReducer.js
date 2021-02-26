import { setErrorInThunk } from "../../components/utils/setErrorInThunk";
import { updateObjectArray } from "../../components/utils/updateObjectArray";
import { projectAPI } from "../../DAL/projectAPI";

const SET_PROJECTS = "SET-PROJECTS";
const CREATE_PROJECT = "CREATE-PROJECT";
const UPDATE_PROJECT = "UPDATE-PROJECT";
const SET_ICON = "SET-ICON";
const SET_VIEWED_PROJECT = "SET-VIEWED-PROJECT";
const SET_COUNT_PAGE = "SET-COUNT-PAGE";
const SET_PAGE_PROJECT = "SET-PAGE-PROJECT";
const LOGOUT = "LOGOUT";

const initialState = {
    page: 1,
    countPage: null,
    projects: [],
    projectViewed: {},
    iconSelected: 1,
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PROJECTS:
            return {
                ...state,
                projects: action.data,
            };

        case CREATE_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.data,
                ],
            };

        case UPDATE_PROJECT:
            return {
                ...state,
                projects: updateObjectArray(state.projects, action.data.id, "id", action.data)
            };

        case SET_ICON:
            return {
                ...state,
                iconSelected: action.data,
            };

        case SET_VIEWED_PROJECT:
            return {
                ...state,
                projectViewed: action.data,
            };

        case SET_COUNT_PAGE:
            return {
                ...state,
                countPage: action.data,
            };

        case SET_PAGE_PROJECT:
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

const setProjects = (projects) => {
    return {
        type: "SET-PROJECTS",
        data: projects,
    };
};

const createProject = (project) => {
    return {
        type: "CREATE-PROJECT",
        data: project,
    };
};

const updateProject = (projects) => {
    return {
        type: "UPDATE-PROJECT",
        data: projects,
    };
};

const setIcon = (iconSelected) => {
    return {
        type: "SET-ICON",
        data: iconSelected,
    };
};

const setViewedProject = (project) => {
    return {
        type: "SET-VIEWED-PROJECT",
        data: project
    }
}
const setCountPage = (count) => {
    return {
        type: "SET-COUNT-PAGE",
        data: count
    }
}
const setPage = (page) => {
    return {
        type: "SET-PAGE-PROJECT",
        data: page
    }
}


// ActionCreator

export const setIconActionCreator = (iconSelected) => {
    return async (dispatch) => {
        dispatch(setIcon(iconSelected));
    };
}

export const setPageActionCreator = (page) => {
    return async (dispatch) => {
        dispatch(setPage(page));
    };
}


// Redux-Thunk

// Dashboard CRUD

export const getProjectPageThunkCreator = (username, token, page) => {
    return async (dispatch) => {
        const response = await projectAPI.getProjectPage(username, token, page);
        dispatch(setProjects(response));
    };
};

export const createProjectThunkCreator = (projectForm, token, projectLength, setError) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.createProject(projectForm, token);
            if (projectLength < 10) {
                //10 - максимальное количество проектов на странице
                dispatch(createProject(response))
            }
        } catch (error) {
            setErrorInThunk(error, setError);
        }
    };
};

export const updateProjectThunkCreator = (projectForm, token, id, setError) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.updateProject(projectForm, token, id);
            dispatch(updateProject(response))
        } catch (error) {
            setErrorInThunk(error, setError);
        }
    };
};

export const deleteProjectThunkCreator = (id, token, username, page) => {
    return async (dispatch) => {
        const response = await projectAPI.deleteProject(id, token);
        dispatch(getProjectPageThunkCreator(username, token, page))
    };
};


//Get Project

export const getProjectThunkCreator = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.getProject(id, token);
            dispatch(setViewedProject(response))
        } catch (error) {
            // 404 PAGE NOT FOUND
        }
    };
};


//Get count of Page

export const getCountPageThunkCreator = (username, token) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.getCountPage(username, token);
            dispatch(setCountPage(response))
        } catch (error) {
            // 404 PAGE NOT FOUND
        }
    };
};

