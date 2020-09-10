import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import "./MangaPage.css";

import MangaProfile from "../components/manga/MangaProfile";

const MangaPage = props => {
    const { idManga } = useParams()
    useEffect(() => {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}`).then(res => {
            props.selectManga(res.data)
        })
    }, [])

    return (
        <div className="manga-page">
            <MangaProfile manga={props.mangaSelected}></MangaProfile>
        </div>
    )
}


const mapStateToProps = state => ({ mangaSelected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({selectManga}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MangaPage);