import React from "react";
import { Link } from "react-router-dom";
import "./MangaProfile.css";

import If from "../../operator/If";
import IconButton from '../IconButton'


const MangaProfile = props => {
    const manga = props.manga
    return (
        <div className="manga-profile">

            <section className="one">
                <div className="banner-container">
                    <img src={manga.image_url} alt="Manga" />
                </div>
                <div className="main-info">
                    <div className="img-container">
                        <img src={manga.image_url} alt="Manga" />
                    </div>
                    <h1>{manga.title}</h1>
                    <span>{manga.score}</span>
                </div>
                <div className="buttons-container">
                    <IconButton icon="play" label="Resume"></IconButton>
                    <IconButton icon="navicon" label={`${manga.chapters_amount} Chapters`}></IconButton>
                    <IconButton icon="heart-o" label="Favorite"></IconButton>
                </div>
            </section>
            <section className="two">
                <If test={manga.description !== undefined}>
                    <div className="description">
                        <p>Description: {manga.description}</p>
                    </div>
                </If>

            </section>
            <section className="three">
            <If test={manga.chapters !== undefined}>
                <div className="chapters-list">
                    <h2>Chapters</h2>
                    <ul>
                        {manga.chapters ? manga.chapters.map((chapter, index) => (
                            <Link key={index} to={`/manga/${manga._id}/chapters/${index}`}><li>{chapter.title}</li></Link>
                        )) : null}
                    </ul>
                </div>
            </If>
            </section>
        </div>
    )
}

export default MangaProfile;