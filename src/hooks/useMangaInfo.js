import useLocalStorage from "./useLocalStorage";

export default function useMangaInfo() {
    const [mangasInfo, setMangasInfo] = useLocalStorage('mangasInfo', {})
    
    const saveManga = (m) => {
        const newManga = {
            _id: m._id,
            chaptersReaded: m.chaptersReaded || {}
        }
        
        console.log(mangasInfo)
        const manga = mangasInfo[m._id] || {_id: m._id, chaptersReaded: {}}
        // console.log("mangasInfo", mangasInfo[m._id].chaptersReaded)
        console.log("manga", manga.chaptersReaded)
        manga.chaptersReaded = {...manga.chaptersReaded, ...newManga.chaptersReaded}
        mangasInfo[manga._id] = manga
        setMangasInfo(mangasInfo)
        // setMangasInfo(prevMangas => ({...prevMangas, manga}));

        // if(!mangasInfo[m._id]){
        //     const mangaToAdd = {}
        //     mangaToAdd[m._id] = newManga
        //     setMangasInfo(prevMangas => ({...prevMangas, ...mangaToAdd}));
        // } else {
        //     setMangasInfo(mangasInfo.map(manga => {
        //         if(manga._id === newManga._id){
        //             manga = {...newManga, chaptersReaded: {...manga.chaptersReaded, ...newManga.chaptersReaded}}
        //         }
        //         return manga
        //     }))
        // }
    }

    return {
        mangasInfo,
        saveManga
    }
}