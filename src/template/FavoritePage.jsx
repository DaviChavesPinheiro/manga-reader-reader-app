import React, { useState, useEffect } from "react";
import useFavoriteManga from "../hooks/useFavoriteManga";
import { showTabs } from "../store/actions/navBarActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios'
import "./FavoritePage.css";


import MangaCard from "../components/MangaCard";

const FavoritePage = props => {
    const { favoritedMangas } = useFavoriteManga()
    const [favoritedMangasList, setFavoritedsMangasList] = useState([])
    useEffect(() => {
        props.showTabs('search', 'home')

        if (favoritedMangas.length) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/${favoritedMangas.toString()}/?select=-chapters,-description`).then(res => {
                setFavoritedsMangasList(Array.isArray(res.data) ? res.data : [res.data])
            })
        } 
    }, [])

    return (
        <div className="favorite-page">
            <h1>Favorites</h1>
            <div className="manga-list-wrapper">
                <ul className="manga-list">
                    {favoritedMangasList.map(manga => <MangaCard key={manga._id} manga={manga}></MangaCard>)}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToPros = dispatch => bindActionCreators({showTabs}, dispatch)

export default connect(null, mapDispatchToPros)(FavoritePage);