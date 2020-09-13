import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import axios from "axios";
import LazyLoad from 'react-lazyload';
import "./Home.css";



import MangaCard from '../components/MangaCard'
const Home = props => {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'more')
        props.setDisplayLabel('Home')
        props.setHideOnScrool(false)

        axios.get(`https://charlotte-services.herokuapp.com/mangas`).then(res => {
            setMangas(res.data)
            if(Object.keys(props.selected).length === 0)
                props.selectManga(res.data[0])
        })
    }, [])

    return (
        <div className="home">
            <header></header>
            <div className="manga-list-container">
                <ul className="manga-list">
                    {mangas.map((manga, index) => (
                        <LazyLoad key={manga._id} height={900}>
                            <MangaCard manga={manga} rank={index + 1}></MangaCard>
                        </LazyLoad>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);