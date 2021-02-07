import React, { useState } from "react";
import styles from "../../styles/Content.module.css";
import Box from '@material-ui/core/Box';
import { UpdateProjectForm } from "./UpdateProjectForm";

export const Project = ({ project, key, token, page, username, deleteProjectThunkCreator, updateProjectThunkCreator }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    return (
        <div>

            <Box key={key} component="span" display="block" p={2} m={1} bgcolor="background.paper">
                <div>{project.name}</div>
                <div>{project.title}</div>
            </Box>

            <button onClick={() => deleteProjectThunkCreator(project.id, token, username, page)}>delete</button>

            {isUpdate ?
                <UpdateProjectForm
                    token={token}
                    page={page}
                    username={username}
                    setIsUpdate={setIsUpdate}
                    updateProjectThunkCreator={updateProjectThunkCreator}
                    id={project.id}
                />
                : <button onClick={() => setIsUpdate(true)}>update</button>
            }

        </div>
    );
};


