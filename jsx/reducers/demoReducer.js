export default function demoReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_VALUE':
            return Object.assign({},state, { value: action.value });
        default:
            return state;
    }
}
