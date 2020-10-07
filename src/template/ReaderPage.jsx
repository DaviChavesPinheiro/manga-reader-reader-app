import React, { useEffect, useState } from "react";
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
import Loading from "../components/utils/Loading/index";
// import Menu from "../components/utils/Menu";


const ReaderPage = props => {
    const { idManga, idChapter } = useParams()
    const [chapters, setChapters] = useState([])
    const [chapterIndex, setChapterIndex] = useState(parseInt(idChapter))
    const { mangasInfo, saveManga } = useMangaInfo()
    let chapterObserver = new IntersectionObserver(onIntersectionChapterObserver, {
        threshold: 0.25,
        rootMargin: "2000px"
    });
    let pageObserver = new IntersectionObserver(onIntersectionPageObserver, {
        threshold: 0.5,
    });
    useEffect(() => {
        props.showTabs('home', 'manga', 'recentPages', 'favoritePages', 'settingsReader')
        props.setHideOnScrool(true)

        const settings = JSON.parse(window.localStorage.getItem('settings')) || {}

        loadChapter(chapterIndex)

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }

    }, [])

    useEffect(() => {
        if (chapters.length === 1 && mangasInfo[idManga] && mangasInfo[idManga].recentChapter && mangasInfo[idManga].recentChapter.title === chapters[chapters.length - 1].title) {
            let recentPage = mangasInfo[idManga] && mangasInfo[idManga].recentChapter && mangasInfo[idManga].recentChapter.recentPage || 0
            if (recentPage > 0)
                recentPage -= 1
            document.querySelector(`#chapter-${chapters[chapters.length - 1].index}`).children[recentPage].scrollIntoView()
        }

        if (chapters.length == 0) return
        chapterObserver.observe(document.querySelector(`#chapter-${chapters[chapters.length - 1].index} .next-chapter-area`))

        const chaptersReaded = {}
        if (chapters.length)
            chaptersReaded[chapters[chapters.length - 1].title] = true

        saveManga({ _id: idManga, chaptersReaded, recentChapter: { title: chapters[chapters.length - 1].title, index: chapterIndex } })
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
                setChapters([...chapters.slice(chapter.length - 1), { title: chapter.title, index: index, pages: chapter.pages }])
            }
            props.setDisplayLabel(`${res.data.title} - ${chapter ? chapter.title : ''}`)
            props.selectManga({ ...res.data, chapters: [] })
        })
    }

    function onIntersectionChapterObserver(entries, chapterObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            goToChapter(chapterIndex + 1)
            chapterObserver.unobserve(entry.target)
        });
    }
    function onIntersectionPageObserver(entries, pageObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return

            const pageIndex = Array.from(entry.target.parentNode.parentNode.children).indexOf(entry.target.parentNode)

            saveManga({ _id: idManga, recentChapter: { recentPage: pageIndex } })
        });
    }

    function onLoad(event) {
        pageObserver.observe(event.target)
        event.target.nextSibling.remove()
    }

    function toggleNavBar(params) {
        document.querySelector(".nav-bar").classList.toggle("hide")
    }

    return (
        <div className="reader-page">
            <If test={!chapters.length}>
                <Loading></Loading>
            </If>
            {chapters.map((chapter) => (
                <div className="reader-pages-container" key={chapter.index} id={`chapter-${chapter.index}`}>
                    {chapter.pages.map((page) => (
                        <LazyLoad key={page} height={900} offset={500}>
                            <img
                                src={page}
                                onLoad={onLoad}
                                onClick={toggleNavBar}
                                style={{ filter: `brightness(${props.reader.imageBrightness}%)`, maxWidth: `${props.reader.zoom}%`}}></img>
                            <Loading></Loading>
                        </LazyLoad>
                    ))}
                    <div className="next-chapter-area">
                        <h3>End Of {chapter.title || "This Chapter"}</h3>
                    </div>

                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({ reader: state.reader })

const mapDispatchToPros = dispatch => bindActionCreators({ selectManga, showTabs, setDisplayLabel, setHideOnScrool }, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(ReaderPage);