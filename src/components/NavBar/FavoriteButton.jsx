import React, { useState, useEffect } from "react";
import useFavoriteManga from "../../hooks/useFavoriteManga";

import IconButton from "../IconButton";

const FavoriteButton = props => {
    const { favoriteManga, unFavoriteManga, isFavoritedManga } = useFavoriteManga()
   
    function toggleFavoriteManga() {
        isFavoritedManga(props.manga._id) ? unFavoriteManga(props.manga._id) : favoriteManga(props.manga._id)
    }

    return (
        <div className="favorite-button" onClick={toggleFavoriteManga}>
            <IconButton icon={isFavoritedManga(props.manga._id) ? "heart" : "heart-o"}></IconButton>
        </div>
    )
}

export default FavoriteButton;