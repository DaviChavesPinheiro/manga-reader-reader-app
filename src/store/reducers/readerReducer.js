const INITIAL_STATE = {imageBrightness: 100, zoom: 100}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case 'IMAGE_BRIGHTNESS_SETTED':
            return {...state, imageBrightness: action.payload}
        case 'IMAGE_ZOOM_SETTED':
            return {...state, zoom: action.payload}
        default:
            return state;
    }
}