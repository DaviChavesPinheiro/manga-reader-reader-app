import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import useFavoriteManga from "../../hooks/useFavoriteManga";

import IconButton from "../IconButton";
import If from "../../operator/If";

const FavoriteButton = props => {
    const { favoriteManga, unFavoriteManga, isFavoritedManga } = useFavoriteManga()
    
    const visible = props.tabsVisible[props.target] === true

    function toggleFavoriteManga() {
        isFavoritedManga(props.manga._id) ? unFavoriteManga(props.manga._id) : favoriteManga(props.manga._id)
    }

    return (
        <If test={visible}>
            <div className="favorite-button" onClick={toggleFavoriteManga}>
                <IconButton icon={isFavoritedManga(props.manga._id) ? "heart" : "heart-o"}></IconButton>
            </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(FavoriteButton);