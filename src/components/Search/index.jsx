import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setVisibility } from "../../store/actions/searchBarActions";
import { selectManga } from "../../store/actions/mangaActions";
import axios from "axios";

import If from '../../operator/If'
import { IconButton } from "../Buttons/style";
import { FixedContainer, SearchBar, SearchInput, ListContainer } from "./style";

const SearchBarComponent = props => {
    const [mangas, setMangas] = useState([])
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.addEventListener("keydown", ({ key }) => {
            if (key === "Enter") {
                search()
            }
        })
    }, [])

    useEffect(() => {
        inputRef.current.focus()
    }, [props.show])

    function onSelectManga(manga) {
        props.setVisibility(!props.show)
        props.selectManga(manga)
    }

    function search() {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/?find=${inputRef.current.value}&&select=title`).then(res => {
            setMangas(res.data)
        })
    }

    return (
        <FixedContainer className={props.show ? 'active' : ''}>
            <SearchBar>
                <IconButton onClick={search} style={{ width: "50px" }}>
                    <i className="fa fa-search"></i>
                </IconButton>
                <SearchInput ref={inputRef}></SearchInput>
            </SearchBar>
            <If test={mangas.length}>
                <ListContainer>
                    <ul>
                        {mangas.map(manga => (
                            <Link to={`/manga/${manga._id}`} onClick={() => onSelectManga(manga)} key={manga._id}><li>{manga.title}</li></Link>
                        ))}
                    </ul>
                </ListContainer>
            </If>
        </FixedContainer>
    )
}

const mapStateToProps = state => ({ show: state.searchBar.show })

const mapDispatchToProps = dispatch => bindActionCreators({ selectManga, setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
