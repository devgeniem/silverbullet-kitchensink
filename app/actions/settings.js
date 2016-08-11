export function saveSettings(settings) {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_SETTINGS',
            settings
        });
    }
}
