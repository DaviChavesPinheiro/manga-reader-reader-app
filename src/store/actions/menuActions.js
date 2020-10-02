
export function setVisibility(value){
    return {
        type: 'MENU_VISIBILITY_SETTED',
        payload: value
    }
}
export function showPages(pagesIDs){
    return {
        type: 'MENU_ACTIVITY_PAGES_SETTED',
        payload: pagesIDs
    }
}