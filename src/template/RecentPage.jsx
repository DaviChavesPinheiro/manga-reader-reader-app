import React, { useState, useEffect } from "react";
import useMangaInfo from "../hooks/useMangaInfo";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import "./RecentPage.css";

import MangaCard from "../components/MangaCard";

const RecentPage = props => {
    const { mangasInfo } = useMangaInfo()
    const [recentMangasList, setRecentMangasList] = useState([])
    
    useEffect(() => {
        props.showTabs('search', 'home')
        props.setHideOnScrool(false)
        
        const recentMangas = getRecentMangasIds()

        if (recentMangas.length) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/${recentMangas.toString()}/?select=-chapters,-description`).then(res => {
                const recMangas = Array.isArray(res.data) ? res.data : [res.data]
                setRecentMangasList(recMangas)
                props.setDisplayLabel(`${recMangas.length} Mangas`)
            })
        } 
    }, [])

    function getRecentMangasIds() {
        const mangas = Object.values(mangasInfo).sort(sortRecentManga).map(manga => {
            return manga._id
        })
        return mangas
    }

    function sortRecentManga(mangaA, mangaB) {
        const lastViewedDateA = mangaA.lastViewedDate || 0
        const lastViewedDateB = mangaB.lastViewedDate || 0
        return lastViewedDateA < lastViewedDateB
    }


    return (
        <div className="recent-page">
            <h1>Recent</h1>
            <div className="manga-list-wrapper">
                <ul className="manga-list">
                    {recentMangasList.map(manga => <MangaCard key={manga._id} manga={manga}></MangaCard>)}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({showTabs, setDisplayLabel, setHideOnScrool}, dispatch)

export default connect(null, mapDispatchToPros)(RecentPage);