import { projectAPI } from "../../DAL/api";


const initialState = {
    page: 1,
    projects: [],
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-PROJECTS":
            return {
                ...state,
                projects: action.data,
            };
        default:
            return state;
    }
};

export const setProjects = (projects) => {
    return {
        type: "SET-PROJECTS",
        data: projects,
    };
};

// Redux-Thunk

export const getProjectPageThunkCreator = (username, token, page) => {
    return async (dispatch) => {
        const response = await projectAPI.getProjectPage(username, token, page);
        dispatch(setProjects(response));
    };
};

export const createProjectThunkCreator = (projectData, token, username, page, projectLength, setError) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.createProject(projectData, token);
            if (projectLength < 3) {
                //3 - максимальное количество проектов на странице
                dispatch(getProjectPageThunkCreator(username, token, page))
            }
        } catch (error) {
            setError(error.response.data.field, {
                type: error.response.status,
                message: error.response.data.message
            });
        }
    };
};

export const deleteProjectThunkCreator = (id, token, username, page) => {
    return async (dispatch) => {
        const response = await projectAPI.deleteProject(id, token);
        dispatch(getProjectPageThunkCreator(username, token, page))
    };
};

export const updateProjectThunkCreator = (projectData, token, id, username, page, setError) => {
    return async (dispatch) => {
        try {
            const response = await projectAPI.updateProject(projectData, token, id);
            dispatch(getProjectPageThunkCreator(username, token, page))
        } catch (error) {
            setError(error.response.data.field, {
                type: error.response.status,
                message: error.response.data.message
            });
        }
    };
};

