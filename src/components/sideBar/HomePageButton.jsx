import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../IconButton";

const HomePageButton = props => {

    return (
        <Link to="/">
            <div className="home-page-button">
                <IconButton icon="home"></IconButton>
            </div>
        </Link>
    )
}

export default HomePageButton;