import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
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
                            <li key={manga._id}>{manga.title}</li>
                        ))}
                    </ul>
                </div>
            </If>
        </div>
    )
}

const mapStateToProps = state => ({ show: state.searchBar.show })

export default connect(mapStateToProps)(SearchBar);
