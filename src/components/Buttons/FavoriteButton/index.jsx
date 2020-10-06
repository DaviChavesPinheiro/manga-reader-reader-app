import React from "react";
import { connect } from "react-redux";
import useFavoriteManga from "../../../hooks/useFavoriteManga";
import If from "../../../operator/If";

import { IconButton } from "../style";

const FavoriteButton = props => {
    const { favoriteManga, unFavoriteManga, isFavoritedManga } = useFavoriteManga()

    const visible = props.target === undefined || props.tabsVisible[props.target] === true

    function toggleFavoriteManga() {
        isFavoritedManga(props.manga._id) ? unFavoriteManga(props.manga._id) : favoriteManga(props.manga._id)
    }

    return (
        <If test={visible}>
            <IconButton onClick={toggleFavoriteManga} className={props.expanded ? 'expanded' : ''} color={isFavoritedManga(props.manga._id) ? "red" : undefined}>
                <i className={isFavoritedManga(props.manga._id) ? "fa fa-heart" : "fa fa-heart-o"}></i>
                <span>{isFavoritedManga(props.manga._id) ? "Favoritado" : "Favoritar"}</span>
            </IconButton>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(FavoriteButton);