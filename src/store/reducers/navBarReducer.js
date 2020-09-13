const INITIAL_STATE = { tabsVisible: {}, displayLabel: '' }

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case 'TAB_SHOWED':
            console.log('TAB_SHOWED', action.payload)
            return { ...state, tabsVisible: action.payload }
        case 'DISPLAY_LABEL_SETTED':
            console.log('DISPLAY_LABEL_SETTED', action.payload)
            return { ...state, displayLabel: action.payload }
        default:
            return state
    }
}