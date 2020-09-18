import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setVisibility } from "../store/actions/searchBarActions";
import { selectManga } from "../store/actions/mangaActions";
import "./SearchBar.css";
import axios from "axios";

import IconButton from "./IconButton";
import If from '../operator/If'

const SearchBar = props => {
    const [mangas, setMangas] = useState([])
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.addEventListener("keydown", ({ key }) => {
            if (key === "Enter") {
                axios.get(`https://charlotte-services.herokuapp.com/mangas/?find=${inputRef.current.value}&&select=title`).then(res => {
                    setMangas(res.data)
                    console.log(res.data)
                })
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

    return (
        <div className={`search-bar-container ${props.show ? 'active' : ''}`}>
            <div className="search-bar">
                <IconButton icon="search"></IconButton>
                <input type="text" name="search" placeholder="Naruto, One Piece, Berserk..." ref={inputRef}></input>
            </div>
            <If test={mangas.length}>
                <div className="manga-list-container">
                    <ul>
                        {mangas.map(manga => (
                            <Link to={`/manga/${manga._id}`} onClick={() => onSelectManga(manga)} key={manga._id}><li>{manga.title}</li></Link>
                        ))}
                    </ul>
                </div>
            </If>
        </div>
    )
}

const mapStateToProps = state => ({ show: state.searchBar.show })

const mapDispatchToProps = dispatch => bindActionCreators({selectManga, setVisibility}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
