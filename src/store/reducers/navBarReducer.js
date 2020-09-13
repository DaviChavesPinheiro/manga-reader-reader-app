const INITIAL_STATE = { tabsVisible: {}, displayLabel: '', hideOnScroll: false }

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case 'TAB_SHOWED':
            return { ...state, tabsVisible: action.payload }
        case 'DISPLAY_LABEL_SETTED':
            return { ...state, displayLabel: action.payload }
        case 'HIDE_ON_SCROLL_SETTED':
            return { ...state, hideOnScroll: action.payload }
        default:
            return state
    }
}