const INITIAL_STATE = {settingsVisibility: false, imageBrightness: 100}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case 'SETTINGS_VISIBILITY_SETTED':
            console.log(action.type, action.payload)
            return {...state, settingsVisibility: action.payload}
        case 'IMAGE_BRIGHTNESS_SETTED':
            console.log(action.type, action.payload)
            return {...state, imageBrightness: action.payload}
        default:
            return state;
    }
}