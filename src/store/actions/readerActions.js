export function setImageBrightness(value) {
    const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
    settings.imagesBrightness = value
    window.localStorage.setItem('settings', JSON.stringify(settings))
    return {
        type: 'IMAGE_BRIGHTNESS_SETTED',
        payload: value
    }
}
export function setImageZoom(value) {
    const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
    settings.imagesZoom = value
    window.localStorage.setItem('settings', JSON.stringify(settings))
    return {
        type: 'IMAGE_ZOOM_SETTED',
        payload: value
    }
}