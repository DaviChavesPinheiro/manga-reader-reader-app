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
    const [chapterIndex, setChapterIndex] = useState(parseInt(idChapter))
    
    
    useEffect(() => {
        props.showTabs('search', 'home', 'favorite')

        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${idChapter}`).then(res => {
            setPages(res.data.chapters[0].pages)
            props.selectManga({...res.data, chapters: []})
        })
    }, [])

    function loadChapter(id = chapterIndex + 1) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        window.history.pushState('', '', `/#/manga/${idManga}/chapters/${id}`);

        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${id}`).then(res => {
            setPages(res.data.chapters[0].pages)
            // props.selectManga({...res.data, chapters: []})
        })

        setChapterIndex(id)

    }

    return (
        <div className="reader-page">
            <div className="reader-pages-container">
                {pages.map((page) => (
                    <LazyLoad key={page} height={900}>
                        <img src={page}></img>
                    </LazyLoad>
                ))}
                <div className="next-chapter-area">
                    <button onClick={() => loadChapter(chapterIndex + 1)}>Next Chapter</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({selected: state.manga.selected})

const mapDispatchToPros = dispatch => bindActionCreators({selectManga, showTabs}, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);