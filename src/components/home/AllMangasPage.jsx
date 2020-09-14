import React from "react";

import LazyLoad from 'react-lazyload';
import MangaCard from '../MangaCard'

const AllMangasPage = props => {
    const { mangas } = props
    return (
        <div className="manga-list-container">
            <ul className="manga-list">
                {mangas.map((manga, index) => (
                    <LazyLoad key={manga._id} height={900}>
                        <MangaCard manga={manga} rank={index + 1}></MangaCard>
                    </LazyLoad>
                ))}
            </ul>
        </div>
    )
}

export default AllMangasPage;