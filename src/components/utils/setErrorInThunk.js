export const setErrorInThunk = (error, setError) => {
    if (error.response) {
        if (error.response.data) {
            setError(error.response.data.field, {
                type: error.response.status,
                message: error.response.data.message
            })
        } else {
            setError("error", {
                type: error.toJSON().name,
                message: error.toJSON().message
            });;
        }
    }
}