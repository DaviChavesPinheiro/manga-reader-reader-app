import React, { useState, useEffect } from "react";
import useFavoriteManga from "../hooks/useFavoriteManga";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import styled from "styled-components";


import MangaCard from "../components/Cards/MangaCard";
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

    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    padding-top: 10px;

    .manga-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0px;
        margin: 0px;
    }
`

const FavoritePage = props => {
    const { favoritedMangas } = useFavoriteManga()
    const [mangas, setMangas] = useState({ data: [], error: false, fetch: false })
    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home', 'recentPages', 'more')
        props.setHideOnScrool(false)

        if (favoritedMangas.length) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/${favoritedMangas.toString()}/?select=-chapters,-description`).then(res => {
                const data = Array.isArray(res.data) ? res.data : [res.data]
                props.setDisplayLabel(`${data.length} Mangás`)
                setMangas({ data: data, error: false, fetch: true })
            }).catch(error => {
                setMangas({ data: [], error: true, fetch: true })
            })
        } else {
            props.setDisplayLabel(`0 Mangás`)
        }
    }, [])

    return (
        <Container>
            <Header title="Favoritos"></Header>
            <ListContainer>
                <If test={mangas.data.length > 0 && !mangas.fetch && !mangas.error}>
                    <Loading></Loading>
                </If>
                <ul className="manga-list">
                    {mangas.data.map(manga => <MangaCard key={manga._id} manga={manga}></MangaCard>)}
                </ul>
            </ListContainer>
        </Container>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({ showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(null, mapDispatchToPros)(FavoritePage);