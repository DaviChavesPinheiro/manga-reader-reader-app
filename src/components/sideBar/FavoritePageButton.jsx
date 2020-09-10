import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../IconButton";

const FavoritePageButton = props => {

    return (
        <Link to="/mangas/favorites">
            <div className="favorite-page-button">
                <IconButton icon="heart-o"></IconButton>
            </div>
        </Link>
    )
}

export default FavoritePageButton;