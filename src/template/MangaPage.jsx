import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import "./MangaPage.css";

import MangaProfile from "../components/Pages/MangaProfile";
import useMangaInfo from "../hooks/useMangaInfo";

const unavailableManga = {
    title: "Unavailable"
}

const MangaPage = props => {
    const { idManga } = useParams()
    const {mangasInfo} = useMangaInfo()
    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home' , 'recentPages', 'more', 'read')
        props.setHideOnScrool(false)
    }, [])


    useEffect(() => {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}`).then(res => {
            console.log(res.data)
            if(res.data){
                props.selectManga(res.data)
                props.setDisplayLabel(`${res.data.title} ${getRecentChapterReaded(idManga) ? '- '+ getRecentChapterReaded(idManga) : ''}`)
            } else {
                props.selectManga({...unavailableManga, ...props.manga.selected})
                props.setDisplayLabel(`Soon...`)
            }
        })
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [idManga])

    function getRecentChapterReaded(id) {
        const manga = Object.values(mangasInfo).find(manga => manga._id === id)
        if(!manga) return ''

        return manga.recentChapter ? manga.recentChapter.title : ''
    }

    return (
        <div className="manga-page">
            <MangaProfile manga={props.manga.selected}></MangaProfile>
        </div>
    )
}


const mapStateToProps = state => ({ manga: state.manga })
const mapDispatchToProps = dispatch => bindActionCreators({selectManga, showTabs, setDisplayLabel, setHideOnScrool}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MangaPage);