import useLocalStorage from "./useLocalStorage";

export default function useFavoriteManga() {
    const [favoritedMangas, setFavoritedMangas] = useLocalStorage('favoritedMangas', [])
    
    const favoriteManga = (id) => {
        if (!favoritedMangas.includes(id)) {
            setFavoritedMangas([...favoritedMangas, id])
        }
    }
    const unFavoriteManga = (id) => {
        setFavoritedMangas(favoritedMangas.filter((v) => v !== id))
    }
    const isFavoritedManga = (id) => {
        return favoritedMangas.includes(id)
    }

    return {
        favoriteManga,
        unFavoriteManga,
        isFavoritedManga,
        favoritedMangas
    }
}