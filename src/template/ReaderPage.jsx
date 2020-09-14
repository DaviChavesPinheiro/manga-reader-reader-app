import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import axios from "axios";

import "./ReaderPage.css";

import LazyLoad from 'react-lazyload';


const ReaderPage = props => {
    const { idManga, idChapter } = useParams()
    const [pages, setPages] = useState([])
    const [chapterIndex, setChapterIndex] = useState(parseInt(idChapter))


    useEffect(() => {
        props.showTabs('search', 'home', 'manga', 'favorite')
        props.setHideOnScrool(true)

        loadChapter(chapterIndex)
    }, [])

    function loadChapter(index) {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${index}`).then(res => {
            const chapter = res.data.chapters[0]
            if (chapter && chapter.pages) {
                setPages(chapter.pages)
            }
            props.setDisplayLabel(`${res.data.title} - ${chapter ? chapter.title : ''}`)
            props.selectManga({ ...res.data, chapters: [] })
        })
    }

    function goToChapter(index) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        window.history.pushState('', '', `/#/manga/${idManga}/chapters/${index}`);

        loadChapter(index)

        setChapterIndex(index)
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
                    <h3>End Of Chapter {chapterIndex + 1}</h3>
                    <button onClick={() => goToChapter(chapterIndex + 1)}>Load Next Chapter</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })

const mapDispatchToPros = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);