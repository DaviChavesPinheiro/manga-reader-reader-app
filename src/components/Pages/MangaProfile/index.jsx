import React, { useRef } from "react";
import { Link } from "react-router-dom";

import If from "../../../operator/If";
import { IconButton } from '../../Buttons/style'
import FavoriteButton from '../../Buttons/FavoriteButton'
import ReadButton from '../../Buttons/ReadButton'
import useMangaInfo from "../../../hooks/useMangaInfo";
import Loading from "../../utils/Loading/index";
import HorizontalCard from "../../Cards/HorizontalCard";

import { Container, Main, Description, Chapters, Characters, Recommendations, ShowMore } from "./style";

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
        <Container>
            <Main>
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
                    <ReadButton target="read" label="Ler" expanded={true}></ReadButton>
                    <IconButton onClick={() => { }} className='expanded'>
                        <i className="fa fa-navicon"></i>
                        <span>{`${manga.chapters_amount || 0} Capítulos`}</span>
                    </IconButton>
                    <FavoriteButton manga={manga} label="Favoritar" expanded={true}></FavoriteButton>
                </div>
            </Main>
            <Description>
                <If test={manga.description !== undefined}>
                    <h2>Descrição</h2>
                    <p>{manga.description}</p>
                </If>
                <If test={manga.description === undefined}>
                    <Loading></Loading>
                </If>

            </Description>
            <Chapters>
                <If test={manga.chapters !== undefined}>
                    <div className="chapters-list">
                        <h2>Capítulos</h2>
                        <ul ref={chaptersListRef} className="shrinked">
                            {manga.chapters ? manga.chapters.map((chapter, index) => (
                                <li key={index} className={`${isChapterAlreadyReaded(chapter.title) ? 'readed' : ''}`}>
                                    <Link to={`/manga/${manga._id}/chapters/${index}`}>{chapter.title}</Link>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <ShowMore ref={chaptersExpandListButton} onClick={() => expandChaptersList(true)}>VER TODOS OS {manga.chapters ? manga.chapters.length : 0} CAPÍTULOS</ShowMore>
                </If>
                <If test={manga.chapters === undefined}>
                    <Loading></Loading>
                </If>
            </Chapters>
            <Characters>
                <If test={manga.characters !== undefined}>
                    <h2>Personagens</h2>
                    <ul ref={charactersListRef} className="shrinked">
                        {manga.characters ? manga.characters.map((character, index) => (
                            <li key={character.mal_id}>
                                <HorizontalCard
                                    manga={{ ...character, _id: character.mal_id }}
                                    image={character.image_url}
                                    title={character.name}
                                    info={[`Role: ${character.role}`]}
                                    primary_link={`/manga/${character.mal_id}`}
                                ></HorizontalCard>
                            </li>
                        )) : null}
                    </ul>
                    <ShowMore className="show-more" ref={charactersExpandListButton} onClick={() => expandCharactersList(true)} style={{margin: "0px 10px", width: "calc(100% - 20px)"}}>
                        VER TODOS OS PERSONAGENS
                    </ShowMore>
                </If>
                <If test={manga.characters === undefined}>
                    <Loading></Loading>
                </If>
            </Characters>
            <Recommendations>
                <If test={manga.recommendations !== undefined}>
                    <h2>Recomendações</h2>
                    <ul>
                        {manga.recommendations ? manga.recommendations.map((recommendation, index) => (
                            <li key={recommendation.mal_id}>
                                <HorizontalCard
                                    manga={{ ...recommendation, _id: recommendation.mal_id }}
                                    image={recommendation.image_url}
                                    title={recommendation.title}
                                    info={[`Votes: ${recommendation.recommendation_count}`]}
                                    primary_link={`/manga/${recommendation.mal_id}`}
                                ></HorizontalCard>
                            </li>
                        )) : null}
                    </ul>
                </If>
                <If test={manga.recommendations === undefined}>
                    <Loading></Loading>
                </If>
            </Recommendations>
        </Container>
    )
}

export default MangaProfile;