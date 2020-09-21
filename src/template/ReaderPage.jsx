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
import useMangaInfo from "../hooks/useMangaInfo";


const ReaderPage = props => {
    const { idManga, idChapter } = useParams()
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(parseInt(idChapter))
    const { saveManga } = useMangaInfo()
    let observer = new IntersectionObserver(onIntersectionObserver, {
        threshold: 0.25
    });
    useEffect(() => {
        props.showTabs('search', 'home', 'manga', 'favorite')
        props.setHideOnScrool(true)

        loadChapter(chapterIndex)

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [])

    useEffect(() => {
        if (chapters.length == 0) return
        observer.observe(document.querySelector(`#chapter-${chapters[chapters.length - 1].index} .next-chapter-area`))
        const chaptersReaded = {}
        if(chapters.length)
            chaptersReaded[chapters[chapters.length - 1].title] = true
        // console.log("chapterIndex", chapterIndex)
        saveManga({_id: idManga, chaptersReaded, lastChapter: chapterIndex})
    }, [chapters])


    function goToChapter(index) {

        window.history.pushState('', '', `/#/manga/${idManga}/chapters/${index}`);

        loadChapter(index)

        setChapterIndex(index)
    }

    function loadChapter(index) {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${idManga}/chapters/${index}`).then(res => {
            const chapter = res.data.chapters[0]
            if (chapter && chapter.pages) {
                let chaptersToAdd = [...chapters]
                if (chaptersToAdd.length > 1) chaptersToAdd.shift()
                setChapters([...chaptersToAdd, {title: chapter.title, index: index, pages: chapter.pages }])
                // const chaptersReaded = {}
                // chaptersReaded[chapter.title] = true
                // saveManga({...res.data, chaptersReaded})
            }
            props.setDisplayLabel(`${res.data.title} - ${chapter ? chapter.title : ''}`)
            props.selectManga({ ...res.data, chapters: [] })
        })
    }

    function onIntersectionObserver(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            console.log(entry)
            goToChapter(chapterIndex + 1)
            observer.unobserve(entry.target)
        });
    }

    function onLoad(event) {
        event.target.nextSibling.remove()
    }

    return (
        <div className="reader-page">
            {chapters.map((chapter) => (
                <div className="reader-pages-container" key={chapter.index} id={`chapter-${chapter.index}`}>
                    {chapter.pages.map((page) => (
                        <LazyLoad key={page} height={900} offset={500}>
                            <img src={page} onLoad={onLoad}></img>
                            <i className="fa fa-circle-o-notch loader"></i>
                        </LazyLoad>
                    ))}
                    <div className="next-chapter-area">
                        <h3>End Of Chapter №{chapter.index + 1}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })

const mapDispatchToPros = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);