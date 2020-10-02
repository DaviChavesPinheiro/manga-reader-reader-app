export function setTheme(theme) {
    const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
    settings.theme = theme
    window.localStorage.setItem('settings', JSON.stringify(settings))

    return {
        type: 'THEME_SELECTED',
        payload: theme
    }
}