import React from "react";
import { Link } from "react-router-dom";
import "./MangaProfile.css";

import If from "../../operator/If";
import IconButton from '../IconButton'
import FavoriteButton from '../NavBar/FavoriteButton'
import ReadButton from '../NavBar/ReadButton'
import useMangaInfo from "../../hooks/useMangaInfo";


const MangaProfile = props => {
    const manga = props.manga
    const {mangasInfo} = useMangaInfo()
    console.log(mangasInfo)

    function isChapterAlreadyReaded(chapterTitle) {
        // console.log(mangasInfo[manga._id], chapterTitle)
        return mangasInfo && mangasInfo[manga._id] && mangasInfo[manga._id]['chaptersReaded'] && mangasInfo[manga._id]["chaptersReaded"][chapterTitle]
    }
    return (
        <div className="manga-profile">

            <section className="one">
                <div className="banner-container">
                    <img src={manga.image_url} alt="Manga" />
                </div>
                <div className="main-info">
                    <div className="img-container">
                        <img src={manga.image_url} alt="Manga" />
                    </div>
                    <h1>{manga.title}</h1>
                    <span>{manga.score}</span>
                </div>
                <div className="buttons-container">
                    <ReadButton target="read" label="Read"></ReadButton>
                    <IconButton icon="navicon" label={`${manga.chapters_amount} Chapters`}></IconButton>
                    <FavoriteButton manga={manga} label="Favorite"></FavoriteButton>
                </div>
            </section>
            <section className="two">
                <If test={manga.description !== undefined}>
                    <div className="description">
                        <p>Description: {manga.description}</p>
                    </div>
                </If>

            </section>
            <section className="three">
                <If test={manga.chapters !== undefined}>
                    <div className="chapters-list">
                        <h2>Chapters</h2>
                        <ul>
                            {manga.chapters ? manga.chapters.map((chapter, index) => (
                                <li key={index} className={`${isChapterAlreadyReaded(chapter.title) ? 'readed' : ''}`}>
                                    <Link to={`/manga/${manga._id}/chapters/${index}`}>{chapter.title}</Link>
                                    <button><i className={`fa fa-check`}></i></button>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                </If>
            </section>
        </div>
    )
}

export default MangaProfile;