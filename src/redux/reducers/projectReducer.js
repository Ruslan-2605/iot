import { projectAPI } from "../../DAL/api";


const initialState = {
    page: 1,
    projects: [],
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-PROJECT-ARRAY":
            return {
                ...state,
                projects: action.data,
            };

        default:
            return state;
    }
};

export const setProjectArray = (project) => {
    return {
        type: "SET-PROJECT-ARRAY",
        data: project,
    };
};

// Redux-Thunk

export const getProjectPageThunkCreator = (username = null, token, page) => {
    return async (dispatch) => {
        const response = await projectAPI.getProjectPage(username, token, page);
        dispatch(setProjectArray(response));
    };
};


