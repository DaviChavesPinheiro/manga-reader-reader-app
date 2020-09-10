import React, { useState } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { Link } from "react-router-dom";
import "./MangaCard.css";

const MangaCard = props => {
    const manga = props.manga
    function onClick(event) {
        if(props.selected._id !== manga._id) event.preventDefault()
        props.selectManga(manga)
        axios.get(`https://charlotte-services.herokuapp.com/mangas/${manga._id}/?select=-chapters`).then(res => {
            props.selectManga(res.data)
        })
    }

    return (
        <Link to={`/manga/${manga._id}`} onClick={onClick}>
            <div className="manga-card">
                <img src={manga.image_url} alt="Manga"/>
                <div className="info">
                    <span className="title">{manga.title}</span>
                    <span className="chapters-score">Chapters: {manga.chapters} | Score: {manga.score}</span>
                </div>
            </div>
        </Link>
    )
}

const mapStateTopProps = state => ({selected: state.manga.selected})

const mapDispatchToProps = dispatch => bindActionCreators({selectManga}, dispatch)

export default connect(mapStateTopProps, mapDispatchToProps)(MangaCard);