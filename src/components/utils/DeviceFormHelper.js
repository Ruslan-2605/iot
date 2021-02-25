export const deviceFormHelper = (deviceForm, project) => {
    if (deviceForm.states) {
        deviceForm.states = deviceForm.states.split(" ")
    } else {
        delete deviceForm.states
    }
    if (!deviceForm.state) {
        delete deviceForm.state
    }
    return { ...deviceForm, "project": project };
}