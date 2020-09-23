import useLocalStorage from "./useLocalStorage";

export default function useMangaInfo() {
    const [mangasInfo, setMangasInfo] = useLocalStorage('mangasInfo', {})
    
    const saveManga = (m) => {
        // const newManga = {
        //     _id: m._id,
        //     chaptersReaded: m.chaptersReaded || {}
        // }
        
        const manga = mangasInfo[m._id] || m

        const chaptersReaded = m.chaptersReaded || {}
        manga.chaptersReaded = {...manga.chaptersReaded, ...chaptersReaded}

        if(m.recentChapter)
            manga.recentChapter = {...manga.recentChapter, ...m.recentChapter}
            
        manga.lastViewedDate = m.lastViewedDate || Date.now()
        mangasInfo[manga._id] = manga
        setMangasInfo(mangasInfo)
        
    }

    return {
        mangasInfo,
        saveManga
    }
}