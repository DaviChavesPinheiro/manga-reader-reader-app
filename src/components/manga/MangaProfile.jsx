import React from "react";
import { Link } from "react-router-dom";
import "./MangaProfile.css";

const MangaProfile = props => {
    const manga = props.manga
    return (
        <div className="manga-profile">
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
                <div className="description">
                    <p>Description: {manga.description}</p>
                </div>
                <div className="episodes">
                    <ul>
                        {manga.chapters ? manga.chapters.map((chapter, index) => (
                            <Link key={index} to={`/manga/${manga._id}/chapters/${index}`}><li>{chapter.title}</li></Link>
                        )) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MangaProfile;