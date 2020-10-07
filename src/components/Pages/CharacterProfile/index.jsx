import React, { useRef } from "react";
import { Link } from "react-router-dom";

import If from "../../../operator/If";
import { IconButton } from '../../Buttons/style'
import Loading from "../../utils/Loading/index";
import HorizontalCard from "../../Cards/HorizontalCard";

import { Container, Main, Description, Chapters, Characters, Recommendations, ShowMore } from "../MangaProfile/style";

const CharacterProfile = props => {
    const character = props.character
    const chaptersListRef = useRef()
    const chaptersExpandListButton = useRef()
    const charactersListRef = useRef()
    const charactersExpandListButton = useRef()


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
                    <img src={character.image_url} alt="Manga" />
                </div>
                <div className="main-info">
                    <div className="img-container">
                        <img src={character.image_url} alt="Manga" />
                    </div>
                    <h1 style={{marginBottom: "50px"}}>{character.error ? "Personagem não encontrado" : character.name}</h1>
                    {/* <span>{getAuthors(character.authors) || '...'}</span> */}
                </div>
            </Main>
            <Description>
                <If test={character.about !== undefined}>
                    <h2>Descrição</h2>
                    <p>{character.about}</p>
                </If>
                <If test={character.about === undefined && character.error !== true}>
                    <Loading></Loading>
                </If>
            </Description>
            {/* <Chapters>
                <If test={character.chapters !== undefined}>
                    <div className="chapters-list">
                        <h2>Capítulos</h2>
                        <ul ref={chaptersListRef} className="shrinked">
                            {character.chapters ? character.chapters.map((chapter, index) => (
                                <li key={index} className={`${isChapterAlreadyReaded(chapter.title) ? 'readed' : ''}`}>
                                    <Link to={`/character/${character._id}/chapters/${index}`}>{chapter.title}</Link>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <ShowMore ref={chaptersExpandListButton} onClick={() => expandChaptersList(true)}>VER TODOS OS {character.chapters ? character.chapters.length : 0} CAPÍTULOS</ShowMore>
                </If>
                <If test={character.chapters === undefined}>
                    <Loading></Loading>
                </If>
            </Chapters>
            <Characters>
                <If test={character.characters !== undefined}>
                    <h2>Personagens</h2>
                    <ul ref={charactersListRef} className="shrinked">
                        {character.characters ? character.characters.map((character, index) => (
                            <li key={character.mal_id}>
                                <HorizontalCard
                                    image={character.image_url}
                                    title={character.name}
                                    info={[`Role: ${character.role}`]}
                                    primary_link={`/character/${character.mal_id}`}
                                ></HorizontalCard>
                            </li>
                        )) : null}
                    </ul>
                    <ShowMore className="show-more" ref={charactersExpandListButton} onClick={() => expandCharactersList(true)} style={{margin: "0px 10px", width: "calc(100% - 20px)"}}>
                        VER TODOS OS PERSONAGENS
                    </ShowMore>
                </If>
                <If test={character.characters === undefined}>
                    <Loading></Loading>
                </If>
            </Characters>
            <Recommendations>
                <If test={character.recommendations !== undefined}>
                    <h2>Recomendações</h2>
                    <ul>
                        {character.recommendations ? character.recommendations.map((recommendation, index) => (
                            <li key={recommendation.mal_id}>
                                <HorizontalCard
                                    character={{ ...recommendation, _id: recommendation.mal_id }}
                                    image={recommendation.image_url}
                                    title={recommendation.title}
                                    info={[`Votes: ${recommendation.recommendation_count}`]}
                                    primary_link={`/character/${recommendation.mal_id}`}
                                ></HorizontalCard>
                            </li>
                        )) : null}
                    </ul>
                </If>
                <If test={character.recommendations === undefined}>
                    <Loading></Loading>
                </If>
            </Recommendations> */}
        </Container>
    )
}

export default CharacterProfile;