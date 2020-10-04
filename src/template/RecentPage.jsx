import React, { useState, useEffect } from "react";
import useMangaInfo from "../hooks/useMangaInfo";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import "./RecentPage.css";

import HorizontalCard from "../components/Cards/HorizontalCard";
import If from "../operator/If";
import Loading from "../components/utils/Loading/index";

const RecentPage = props => {
    const { mangasInfo } = useMangaInfo()
    const [recentMangasList, setRecentMangasList] = useState([])

    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home', 'recentPages', 'more')
        props.setHideOnScrool(false)

        const recentMangas = getRecentMangasIds()

        if (recentMangas.length) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/${recentMangas.toString()}/?select=-chapters,-description`).then(res => {
                let recMangas = Array.isArray(res.data) ? res.data : [res.data]
                recMangas.map(manga => {
                    manga.lastViewedDate = mangasInfo[manga._id].lastViewedDate || 0
                    manga.recentChapter = mangasInfo[manga._id].recentChapter || {}
                    return manga
                })
                recMangas.sort(sortRecentManga)
                setRecentMangasList(recMangas)
                props.setDisplayLabel(`${recMangas.length} Mangas`)
            })
        }
    }, [])

    function getRecentMangasIds() {
        let mangas = Object.values(mangasInfo)
        return mangas.map(manga => { return manga._id })
    }

    function sortRecentManga(mangaA, mangaB) {
        const lastViewedDateA = mangaA.lastViewedDate || 0
        const lastViewedDateB = mangaB.lastViewedDate || 0
        return lastViewedDateB - lastViewedDateA
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    return (
        <div className="recent-page">
            <h1>Recent</h1>
            <div className="manga-list-wrapper">
                <If test={!recentMangasList.length}>
                    <Loading></Loading>
                </If>
                <ul className="manga-list">
                    {recentMangasList.map(manga => (
                        <HorizontalCard key={manga._id}
                            title={manga.title}
                            image={manga.image_url}
                            info={[manga.recentChapter ? manga.recentChapter.title : '', timeSince(manga.lastViewedDate)]}
                            primary_link={`/manga/${manga._id}/chapters/${manga.recentChapter.index || 0}`}
                            secondary_link={`/manga/${manga._id}`}
                            manga={manga}
                        >
                        </HorizontalCard>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({ showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(null, mapDispatchToPros)(RecentPage);