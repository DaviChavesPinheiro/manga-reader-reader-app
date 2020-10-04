import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./MangaProfile.css";

import If from "../../operator/If";
import { IconButton } from '../Buttons/style'
import FavoriteButton from '../Buttons/FavoriteButton'
import ReadButton from '../Buttons/ReadButton'
import useMangaInfo from "../../hooks/useMangaInfo";
import Loading from "../utils/Loading/index";
import HorizontalCard from "../Cards/HorizontalCard";


const MangaProfile = props => {
    const manga = props.manga
    const { mangasInfo } = useMangaInfo()
    const chaptersListRef = useRef()
    const chaptersExpandListButton = useRef()
    const charactersListRef = useRef()
    const charactersExpandListButton = useRef()

    function isChapterAlreadyReaded(chapterTitle) {
        return mangasInfo && mangasInfo[manga._id] && mangasInfo[manga._id]['chaptersReaded'] && mangasInfo[manga._id]["chaptersReaded"][chapterTitle]
    }

    function expandChaptersList(expand) {
        if (expand) {
            chaptersListRef.current.classList.remove("shrinked")
            chaptersExpandListButton.current.classList.add("hidden")
        } else {
            chaptersListRef.current.classList.add("shrinked")
            chaptersExpandListButton.current.classList.remove("hidden")
        }
    }
    function expandCharactersList(expand) {
        if (expand) {
            charactersListRef.current.classList.remove("shrinked")
            charactersExpandListButton.current.classList.add("hidden")
        } else {
            charactersListRef.current.classList.add("shrinked")
            charactersExpandListButton.current.classList.remove("hidden")
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
                    <span>{getAuthors(manga.authors) || '...'}</span>
                </div>
                <div className="buttons-container">
                    <ReadButton target="read" label="Read" expanded={true}></ReadButton>
                    <IconButton onClick={() => {}} className='expanded'>
                        <i className="fa fa-navicon"></i>
                        <span>{`${manga.chapters_amount || 0} Chapters`}</span>
                    </IconButton>
                    <FavoriteButton manga={manga} label="Favorite" expanded={true}></FavoriteButton>
                </div>
            </section>
            <section className="description">
                <If test={manga.description !== undefined}>
                    <h2>Description</h2>
                    <p>{manga.description}</p>
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
                    <button className="show-more" ref={chaptersExpandListButton} onClick={() => expandChaptersList(true)}>VIEW ALL {manga.chapters ? manga.chapters.length : 0} CHAPTERS</button>
                </If>
                <If test={manga.chapters === undefined}>
                    <Loading></Loading>
                </If>
            </section>
            <section className="characters">
                <If test={manga.characters !== undefined}>
                    <h2>Characters</h2>
                    <ul ref={charactersListRef} className="shrinked">
                        {manga.characters ? manga.characters.map((character, index) => (
                            <li key={character.mal_id}>
                                <HorizontalCard
                                    manga={{ ...character, _id: character.mal_id }}
                                    image={character.image_url}
                                    title={character.name}
                                    info={[`Role: ${character.role}`]}
                                    primary_link={`/manga/${manga._id}`}
                                ></HorizontalCard>
                            </li>
                        )) : null}
                    </ul>
                    <button className="show-more" ref={charactersExpandListButton} onClick={() => expandCharactersList(true)}>VIEW ALL CHARACTERS</button>
                </If>
                <If test={manga.characters === undefined}>
                    <Loading></Loading>
                </If>
            </section>
            <section className="recommendations">
                <If test={manga.recommendations !== undefined}>
                    <h2>Recommendations</h2>
                    <ul>
                        {manga.recommendations ? manga.recommendations.map((recommendation, index) => (
                            <li key={recommendation.mal_id}>
                                <HorizontalCard
                                    manga={{ ...recommendation, _id: recommendation.mal_id }}
                                    image={recommendation.image_url}
                                    title={recommendation.title}
                                    info={[`Votes: ${recommendation.recommendation_count}`]}
                                    primary_link={`/manga/${manga._id}`}
                                ></HorizontalCard>
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