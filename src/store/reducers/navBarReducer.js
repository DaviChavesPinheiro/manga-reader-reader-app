const INITIAL_STATE = { tabsVisible: {} }

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case 'TAB_SHOWED':
            console.log('TAB_SHOWED', action.payload)
            return { ...state, tabsVisible: action.payload }
        default:
            return state
    }
}