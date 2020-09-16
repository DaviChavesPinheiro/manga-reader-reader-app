import React, { useState } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { Link } from "react-router-dom";
import "./MangaCard.css";

const MangaCard = props => {
    const manga = props.manga
    function onClick() {
        props.selectManga(manga)
    }
    
    return (
        <Link to={`/manga/${manga._id}`} onClick={onClick}>
            <div className="manga-card">
                <img src={manga.image_url} alt="Manga"/>
                <div className="info">
                    <h3 className="title">{manga.title}</h3>
                    <span className="chapters-score">Chapters: {manga.chapters_amount} | Score: {manga.score}</span>
                </div>
            </div>
        </Link>
    )
}

const mapStateTopProps = state => ({selected: state.manga.selected})

const mapDispatchToProps = dispatch => bindActionCreators({selectManga}, dispatch)

export default connect(mapStateTopProps, mapDispatchToProps)(MangaCard);