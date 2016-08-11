    export default function customerReducer(state = {}, action) {
    switch(action.type) {
        case 'LOAD_CUSTOMER':
            return Object.assign({}, { customer: action.customer } );
        default:
            return state;
    }
}
