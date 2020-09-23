export function setSettingsVisibility(visibility) {
    return {
        type: 'SETTINGS_VISIBILITY_SETTED',
        payload: visibility
    }
}
export function setImageBrightness(value) {
    const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
    settings.imagesBrightness = value
    window.localStorage.setItem('settings', JSON.stringify(settings))
    return {
        type: 'IMAGE_BRIGHTNESS_SETTED',
        payload: value
    }
}