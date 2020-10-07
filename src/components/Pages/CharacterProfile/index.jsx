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
            <Main style={{height: "50vmax"}}>
                <div className="banner-container">
                    <img src={character.image_url} alt="Manga" />
                </div>
                <div className="main-info">
                    <div className="img-container">
                        <img style={{top: "-110px"}} src={character.image_url} alt="Manga" />
                    </div>
                    <h1 style={{marginBottom: "50px"}}>{character.error ? "Personagem não encontrado" : character.name}</h1>
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
        </Container>
    )
}

export default CharacterProfile;