export function selectManga(manga) {
    return {
        type: 'MANGA_SELECTED',
        payload: manga
    }
}