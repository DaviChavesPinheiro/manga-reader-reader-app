import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs } from "../store/actions/navBarActions";
import axios from "axios";

import "./ReaderPage.css";

import LazyLoad from 'react-lazyload';


const ReaderPage = props => {
    const { idManga, idChapter } = useParams()
    const [pages, setPages] = useState([])
    useEffect(() => {
        props.showTabs('search', 'home', 'play', 'favorite')

        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${idChapter}`).then(res => {
            setPages(res.data.chapters[0].pages)
            props.selectManga({...res.data, chapters: []})
        })
    }, [])
    return (
        <div className="reader-page">
            <div className="reader-pages-container">
                {pages.map((page, index) => (
                    <LazyLoad key={index} height={900} unmountIfInvisible={true}>
                        <img src={page}></img>
                    </LazyLoad>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({selected: state.manga.selected})

const mapDispatchToPros = dispatch => bindActionCreators({selectManga, showTabs}, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);