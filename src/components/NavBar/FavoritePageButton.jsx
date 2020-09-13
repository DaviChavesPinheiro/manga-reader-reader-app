import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";

const FavoritePageButton = props => {
    const visible = props.tabsVisible[props.target] === true

    return (
        <If test={visible}>
            <Link to="/mangas/favorites">
                <div className="favorite-page-button">
                    <IconButton icon="heart-o" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}

const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(FavoritePageButton);