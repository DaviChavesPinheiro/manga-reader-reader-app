import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import axios from "axios";
import "./Home.css";


import If from "../operator/If";

import HomeHeader from "../components/home/header/HomeHeader";
import AllMangasPage from "../components/home/AllMangasPage";
const Home = props => {
    const [mangas, setMangas] = useState([])
    const [activeHeaderTab, setActiveHeaderTab] = useState('All')

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

    function setHeaderTab(tabTarget) {
        setActiveHeaderTab(tabTarget)
    }

    return (
        <div className="home">
            <HomeHeader setActiveTab={setHeaderTab} activeTab={activeHeaderTab}></HomeHeader>
            <If test={activeHeaderTab === 'All'}>
                <AllMangasPage mangas={mangas}></AllMangasPage>
            </If>
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);