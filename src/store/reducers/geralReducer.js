const INITIAL_STATE = {theme: ''}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'THEME_SELECTED':
            return {...state, theme: action.payload}
        default:
            return state;
    }
}