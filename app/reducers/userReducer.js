export default function userReducer(state = {}, action) {
    switch(action.type) {
        case 'USER_LOGIN':
            return Object.assign({}, { user: action.user } );
        case 'LOAD_USERS':
            return Object.assign({}, { users: action.users } );
        case 'ERROR':
            return Object.assign({}, { error: action.error } );
        default:
            return state;
    }
}
