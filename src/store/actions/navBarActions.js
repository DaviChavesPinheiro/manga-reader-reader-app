export function showTabs(...tabsIds){
    const tabsToShow = {}
    tabsIds.forEach(value => tabsToShow[value] = true)
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}
export function setDisplayLabel(label){
    return {
        type: 'DISPLAY_LABEL_SETTED',
        payload: label
    }
}