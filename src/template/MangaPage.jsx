import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import "./MangaPage.css";

import MangaProfile from "../components/manga/MangaProfile";
import useMangaInfo from "../hooks/useMangaInfo";

const MangaPage = props => {
    const { idManga } = useParams()
    const {mangasInfo} = useMangaInfo()
    useEffect(() => {
        props.showTabs('search', 'home', 'recentPages', 'favoritePages' , 'read')
        props.setHideOnScrool(false)
        
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [])


    useEffect(() => {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}`).then(res => {
            props.selectManga(res.data)
            props.setDisplayLabel(`${res.data.title} ${getRecentChapterReaded(idManga) ? '- '+ getRecentChapterReaded(idManga) : ''}`)
        })
    }, [idManga])

    function getRecentChapterReaded(id) {
        const manga = Object.values(mangasInfo).find(manga => manga._id === id)
        if(!manga) return ''

        return manga.recentChapter ? manga.recentChapter.title : ''
    }

    return (
        <div className="manga-page">
            <MangaProfile manga={props.mangaSelected}></MangaProfile>
        </div>
    )
}


const mapStateToProps = state => ({ mangaSelected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({selectManga, showTabs, setDisplayLabel, setHideOnScrool}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MangaPage);