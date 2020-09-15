const INITIAL_STATE = {show: false}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'VISIBILITY_SETTED':
            return {...state, show: action.payload}
        default:
            return state;
    }
}