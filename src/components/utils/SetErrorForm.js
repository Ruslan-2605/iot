export const setErrorForm = (e, setError) => {
    Object.keys(e).map(key => {
        return setError(key, {
            type: e[key].type,
            message: e[key].message
        });
    })
}