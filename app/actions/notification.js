import uuid from 'node-uuid';

export function addNotification(style, message) {
    return (dispatch, getState) => {
        var id = uuid.v1();
        dispatch({
            type: 'ADD_NOTIFICATION',
            id,
            style,
            message
        });
    }
}

export function removeNotification(id) {
    return (dispatch, getState) => {
        dispatch({
            type: 'REMOVE_NOTIFICATION',
            id
        });
    }
}
