import api from '../services/api';

export function login(email, password, rememberme) {
    return dispatch => {
        api.login({ email: email, password: password, rememberme:rememberme }).
            then(user => {
                dispatch({
                    type: 'USER_LOGIN',
                    user: user
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERROR',
                    error: err
                });
            });
    };
}

export function loadUsers() {
    return dispatch => {
        api.get('/users')
            .then(users => {
                dispatch({
                    type: 'LOAD_USERS',
                    users
                });
            })
            .catch(err => {
                dispatch({
                    type: 'ERROR',
                    error: err
                });
            });
    };
}
