import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import "./MangaPage.css";

import MangaProfile from "../components/manga/MangaProfile";

const MangaPage = props => {
    const { idManga } = useParams()
    useEffect(() => {
        props.showTabs('search', 'home', 'read')
        props.setDisplayLabel(props.mangaSelected.title)
        props.setHideOnScrool(false)

        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}`).then(res => {
            props.selectManga(res.data)
            props.setDisplayLabel(res.data.title)
        })
    }, [])

    return (
        <div className="manga-page">
            <MangaProfile manga={props.mangaSelected}></MangaProfile>
        </div>
    )
}


const mapStateToProps = state => ({ mangaSelected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({selectManga, showTabs, setDisplayLabel, setHideOnScrool}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MangaPage);