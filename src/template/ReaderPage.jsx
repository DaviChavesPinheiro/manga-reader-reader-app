import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";
import axios from "axios";

import "./ReaderPage.css";

import LazyLoad from 'react-lazyload';
import If from "../operator/If";


const ReaderPage = props => {
    const { idManga, idChapter } = useParams()
    const [chapters, setChapters] = useState([])
    const [pages, setPages] = useState([])
    const [chapterIndex, setChapterIndex] = useState(parseInt(idChapter))
    const nextChapterRef = useRef()


    useEffect(() => {
        props.showTabs('search', 'home', 'manga', 'favorite')
        props.setHideOnScrool(true)

        loadChapter(chapterIndex)

        let observer = new IntersectionObserver(onArriveOnEnd, {
            threshold: 0.25
        });
        // observer.observe(nextChapterRef.current)

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    }, [])


    function goToChapter(index) {
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;

        window.history.pushState('', '', `/#/manga/${idManga}/chapters/${index}`);

        loadChapter(index)

        setChapterIndex(index)
    }

    function loadChapter(index) {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${index}`).then(res => {
            const chapter = res.data.chapters[0]
            if (chapter && chapter.pages) {
                setPages(chapter.pages)
                setChapters([...chapters, {index: index, pages: chapter.pages}])
            }
            props.setDisplayLabel(`${res.data.title} - ${chapter ? chapter.title : ''}`)
            props.selectManga({ ...res.data, chapters: [] })
        })
    }

    function onArriveOnEnd(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            console.log(entry)

            observer.unobserve(entry.target)
        });
    }

    function onLoad(event) {
        console.log(event.target.nextSibling)
        event.target.nextSibling.remove()
    }

    return (
        <div className="reader-page">
            {chapters.map((chapter) => (
                <div className="reader-pages-container" key={chapter.index} id={`chapter-${chapter.index}`}>
                    {chapter.pages.map((page) => (
                        <LazyLoad key={page} height={900}>
                            <img src={page} onLoad={onLoad}></img>
                            <i className="fa fa-circle-o-notch loader"></i>
                        </LazyLoad>
                    ))}
                    <div className="next-chapter-area" ref={nextChapterRef}>
                        <h3>End Of Chapter №{chapter.index + 1}</h3>
                        <If test={chapters[chapter.index + 1] === undefined}>
                            <button onClick={() => goToChapter(chapter.index + 1)}>Load Next Chapter</button>
                        </If>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })

const mapDispatchToPros = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);