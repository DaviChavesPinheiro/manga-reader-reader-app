import React, { useState, useEffect } from "react";
import useMangaInfo from "../hooks/useMangaInfo";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import styled from "styled-components";

import HorizontalCard from "../components/Cards/HorizontalCard";
import If from "../operator/If";
import Loading from "../components/utils/Loading/index";

import Header from "../components/Header";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;    
`
const ListContainer = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    padding-top: 10px;

    .manga-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        padding: 0px;
        margin: 0px;
    }
`

const RecentPage = props => {
    const { mangasInfo } = useMangaInfo()
    const [mangas, setMangas] = useState({ data: [], error: false, fetch: false })

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
                setMangas({data: recMangas, error: false, fetch: true})
                props.setDisplayLabel(`${recMangas.length} Mangás`)
            }).catch(error => {
                setMangas({ data: [], error: true, fetch: true })
            })
        } else {
            props.setDisplayLabel(`0 Mangás`)
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
            return Math.floor(interval) + " anos atrás";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " meses atrás";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " dias atrás";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " horas atrás";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutos atrás";
        }
        return Math.floor(seconds) + " segundos atrás";
    }

    return (
        <Container>
            <Header title="Recentes"></Header>
            <ListContainer>
                <If test={mangas.data.length > 0 && !mangas.fetch && !mangas.error}>
                    <Loading></Loading>
                </If>
                <ul className="manga-list">
                    {mangas.data.map(manga => (
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
            </ListContainer>
        </Container>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({ showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(null, mapDispatchToPros)(RecentPage);