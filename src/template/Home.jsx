import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import "./Home.css";


import Header from "../components/Header";
import AllMangasPage from "../components/home/AllMangasPage";
import ForYouMangasPage from "../components/home/ForYouMangasPage";
import PopularMangasPage from "../components/home/PopularMangasPage";
const Home = props => {
    const [activeHeaderTab, setActiveHeaderTab] = useState('All')

    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home' , 'recentPages', 'more')
        props.setDisplayLabel('Home')
        props.setHideOnScrool(false)

    }, [])

    function setHeaderTab(tabTarget) {
        setActiveHeaderTab(tabTarget)
    }

    return (
        <div className="home">
            <Header title="Manga Nero" setActiveTab={setHeaderTab} activeTab={activeHeaderTab}></Header>
            <AllMangasPage show={activeHeaderTab === 'All'}></AllMangasPage>
            <ForYouMangasPage show={activeHeaderTab === 'For You'}></ForYouMangasPage>
            <PopularMangasPage show={activeHeaderTab === 'Popular'}></PopularMangasPage>
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);