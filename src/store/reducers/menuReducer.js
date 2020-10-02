const INITIAL_STATE = { visibility: false, activityPages: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MENU_VISIBILITY_SETTED':
            return { ...state, visibility: action.payload }
        case 'MENU_ACTIVITY_PAGES_SETTED':
            return { ...state, activityPages: action.payload }
        default:
            return state
    }
}