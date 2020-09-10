import React from "react";
import { Link } from "react-router-dom";
import "./MangaPreview.css";

const MangaPreview = props => {
    const {manga} = props 
    return (
        <div className="manga-preview">
            <h2>{manga.title}</h2>
            <div className="header">
                <img src={manga.image_url} alt="Manga" />
                <div className="info">
                    <p><strong>Chapters:</strong> {manga.chapters_amount}</p>
                    <p><strong>Score:</strong> {manga.score}</p>
                    <p><strong>Members:</strong> {manga.members}</p>
                </div>
            </div>
            <div className="body">
                <Link to={`/manga/${manga._id}`}>Ver Página Completa</Link>
                <div className="description">
                    <p>Description: {manga.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MangaPreview;