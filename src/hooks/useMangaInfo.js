import useLocalStorage from "./useLocalStorage";

export default function useMangaInfo() {
    const [mangasInfo, setMangasInfo] = useLocalStorage('mangasInfo', {})
    
    const saveManga = (m) => {
        const newManga = {
            _id: m._id,
            chaptersReaded: m.chaptersReaded || {},
            lastChapter: m.lastChapter || 0
        }
        
        // console.log(mangasInfo)
        const manga = mangasInfo[m._id] || {_id: m._id, chaptersReaded: {}}

        // console.log("manga", manga.chaptersReaded)
        manga.chaptersReaded = {...manga.chaptersReaded, ...newManga.chaptersReaded}
        manga.lastChapter = m.lastChapter || 0
        manga.lastViewedDate = m.lastViewedDate || Date.now()
        mangasInfo[manga._id] = manga
        setMangasInfo(mangasInfo)
        
    }

    return {
        mangasInfo,
        saveManga
    }
}