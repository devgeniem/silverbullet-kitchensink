export function setStoreValue(value) {
    return (dispatch, getState) => {
        dispatch({
            SET_VALUE,
            value:value
        });
    }
}
