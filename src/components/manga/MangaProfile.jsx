import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./MangaProfile.css";

import If from "../../operator/If";
import IconButton from '../IconButton'
import FavoriteButton from '../NavBar/FavoriteButton'
import ReadButton from '../NavBar/ReadButton'
import useMangaInfo from "../../hooks/useMangaInfo";
import Loading from "../utils/Loading";
import RecommendationCard from "./RecommendationCard";


const MangaProfile = props => {
    const manga = props.manga
    const { mangasInfo } = useMangaInfo()
    const chaptersListRef = useRef()
    const expandListButton = useRef()

    function isChapterAlreadyReaded(chapterTitle) {
        return mangasInfo && mangasInfo[manga._id] && mangasInfo[manga._id]['chaptersReaded'] && mangasInfo[manga._id]["chaptersReaded"][chapterTitle]
    }

    function expandChaptersList(expand) {
        if (expand) {
            chaptersListRef.current.classList.remove("shrinked")
            expandListButton.current.classList.add("hidden")
        } else {
            chaptersListRef.current.classList.add("shrinked")
            expandListButton.current.classList.remove("hidden")
        }
    }

    function getAuthors(authors) {
        return authors ? authors.map(author => author.name).join(" & ") : undefined
    }
    return (
        <div className="manga-profile">

            <section className="main">
                <div className="banner-container">
                    <img src={manga.image_url} alt="Manga" />
                </div>
                <div className="main-info">
                    <div className="img-container">
                        <img src={manga.image_url} alt="Manga" />
                    </div>
                    <h1>{manga.title}</h1>
                    <span>{getAuthors(manga.authors) || manga.score}</span>
                </div>
                <div className="buttons-container">
                    <ReadButton target="read" label="Read"></ReadButton>
                    <IconButton icon="navicon" label={`${manga.chapters_amount} Chapters`}></IconButton>
                    <FavoriteButton manga={manga} label="Favorite"></FavoriteButton>
                </div>
            </section>
            <section className="description">
                <If test={manga.description !== undefined}>
                    <div className="description">
                        <h2>Description</h2>
                        <p>{manga.description}</p>
                    </div>
                </If>
                <If test={manga.description === undefined}>
                    <Loading></Loading>
                </If>

            </section>
            <section className="chapters">
                <If test={manga.chapters !== undefined}>
                    <div className="chapters-list">
                        <h2>Chapters</h2>
                        <ul ref={chaptersListRef} className="shrinked">
                            {manga.chapters ? manga.chapters.map((chapter, index) => (
                                <li key={index} className={`${isChapterAlreadyReaded(chapter.title) ? 'readed' : ''}`}>
                                    <Link to={`/manga/${manga._id}/chapters/${index}`}>{chapter.title}</Link>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <button ref={expandListButton} onClick={() => expandChaptersList(true)}>VIEW ALL {manga.chapters ? manga.chapters.length : 0} CHAPTERS</button>
                </If>
                <If test={manga.chapters === undefined}>
                    <Loading></Loading>
                </If>
            </section>
            <section className="recommendations">
                <If test={manga.recommendations !== undefined}>
                    <h2>Recommendations</h2>
                    <ul>
                        {manga.recommendations ? manga.recommendations.map((recommendation, index) => (
                            <li key={recommendation.mal_id}>
                                <RecommendationCard manga={{...recommendation, _id: recommendation.mal_id}}></RecommendationCard>
                            </li>
                        )) : null}
                    </ul>
                </If>
                <If test={manga.recommendations === undefined}>
                    <Loading></Loading>
                </If>
            </section>
        </div>
    )
}

export default MangaProfile;