export default function demoReducer(state = {}, action) {
    switch(action.type) {
        case 'TEST':
            return Object.assign({},state, { test: true });
        default:
            return state;
    }
}