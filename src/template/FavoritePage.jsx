import React, { useState, useEffect } from "react";
import useFavoriteManga from "../hooks/useFavoriteManga";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import "./FavoritePage.css";


import MangaCard from "../components/MangaCard";
import If from "../operator/If";
import Loading from "../components/utils/Loading";

const FavoritePage = props => {
    const { favoritedMangas } = useFavoriteManga()
    const [favoritedMangasList, setFavoritedsMangasList] = useState([])
    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home' , 'recentPages', 'more')
        props.setHideOnScrool(false)

        if (favoritedMangas.length) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/${favoritedMangas.toString()}/?select=-chapters,-description`).then(res => {
                const favMangas = Array.isArray(res.data) ? res.data : [res.data]
                setFavoritedsMangasList(favMangas)
                props.setDisplayLabel(`${favMangas.length} Favorites`)
            })
        }
    }, [])

    return (
        <div className="favorite-page">
            <h1>Favorites</h1>
            <div className="manga-list-wrapper">
                <If test={!favoritedMangasList.length}>
                    <Loading></Loading>
                </If>
                <ul className="manga-list">
                    {favoritedMangasList.map(manga => <MangaCard key={manga._id} manga={manga}></MangaCard>)}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({ showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(null, mapDispatchToPros)(FavoritePage);