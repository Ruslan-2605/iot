import { Redirect } from "react-router-dom";
import { setErrorInThunk } from "../../components/utils/setErrorInThunk";
import { updateObjectArray } from "../../components/utils/updateObjectArray";
import { projectAPI } from "../../DAL/projectAPI";

const SET_PROJECTS = "SET-PROJECTS";
const CREATE_PROJECT = "CREATE-PROJECT";
const UPDATE_PROJECT = "UPDATE-PROJECT";
const SET_ICON = "SET-ICON";
const SET_VIEWED_PROJECT = "SET-VIEWED-PROJECT";
const SET_PAGINATION_INFO = "SET-PAGINATION-INFO";
const SET_PAGE_PROJECT = "SET-PAGE-PROJECT";
const SET_INITIAL_PROJECT_VIEWED = "SET-INITIAL-PROJECT-VIEWED";
const LOGOUT = "LOGOUT";

const initialState = {
    page: 1,
    paginationInfo: {},
    projects: [],
    projectViewed: {},
    iconSelected: 1,
};

export const projectsReducer = (state = initialState, action) => {
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

        case SET_PAGINATION_INFO:
            return {
                ...state,
                paginationInfo: action.data,
            };

        case SET_PAGE_PROJECT:
            return {
                ...state,
                page: action.data,
            };

        case SET_INITIAL_PROJECT_VIEWED:
            return {
                ...state,
                projectViewed: {}
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
const setPaginationInfo = (info) => {
    return {
        type: "SET-PAGINATION-INFO",
        data: info
    }
}
const setPage = (page) => {
    return {
        type: "SET-PAGE-PROJECT",
        data: page
    }
}
const setInitialProjectViewed = () => {
    return {
        type: "SET-INITIAL-PROJECT-VIEWED",
    }
}


// ActionCreator

export const setIconActionCreator = (iconSelected) => {
    return (dispatch) => {
        dispatch(setIcon(iconSelected));
    };
}

export const setPageActionCreator = (page) => {
    return (dispatch) => {
        dispatch(setPage(page));
    };
}

export const setInitialProjectViewedActionCreator = () => {
    return (dispatch) => {
        dispatch(setInitialProjectViewed());
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

export const createProjectThunkCreator = (projectForm, token, projectLength, elementPerPage, setError) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.createProject(projectForm, token);
            if (projectLength < elementPerPage) {
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
            dispatch(setViewedProject(response))
        } catch (error) {
            setErrorInThunk(error, setError);
        }
    };
};

export const deleteProjectThunkCreator = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.deleteProject(id, token);
            return response
        } catch (error) {
            //error
        }
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

export const getPaginationInfoThunkCreator = (username, token) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.getPaginationInfo(username, token);
            dispatch(setPaginationInfo(response))
        } catch (error) {
            // 404 PAGE NOT FOUND
        }
    };
};

