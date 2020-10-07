import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { showTabs, setDisplayLabel, setHideOnScrool } from "../store/actions/navBarActions";

import CharacterProfile from "../components/Pages/CharacterProfile";
import styled from "styled-components";

const Container = styled.div`
    max-width: 1000px;
    width: 100%;
`

const CharacterPage = props => {
    const { idCharacter } = useParams()
    const [character, setCharacter] = useState({})
    useEffect(() => {
        props.showTabs('search', 'favoritePages', 'home' , 'recentPages', 'more')
        props.setHideOnScrool(false)
    }, [])


    useEffect(() => {
        axios.get(`https://api.jikan.moe/v3/character/${idCharacter}`).then(res => {
            const data = mapJikanCharacter(res.data)
            setCharacter(data || {})
            props.setDisplayLabel(`${data ? data.name : ""}`)
        }).catch(error => {
            setCharacter({error: true})
            props.setDisplayLabel("Personagem não encontrado")
        })

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [idCharacter])

    function mapJikanCharacter(data) {
        if(data === undefined) return undefined

        return {
            ...data,
            about: data.about ? data.about.replaceAll("\\n", "") : undefined
        }
    }
    
    return (
        <Container>
            <CharacterProfile character={character}></CharacterProfile>
        </Container>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({showTabs, setDisplayLabel, setHideOnScrool}, dispatch)

export default connect(null, mapDispatchToProps)(CharacterPage);