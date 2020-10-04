import React from "react";
import { connect } from "react-redux";

import If from "../../../operator/If";
import { IconLink } from "../style";

const FavoritePageButton = props => {
    const visible = props.tabsVisible[props.target] === true

    return (
        <If test={visible}>
            <IconLink to="/mangas/favorites" className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-heart"></i>
                <span>{props.label}</span>
            </IconLink>
        </If>
    )
}

const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(FavoritePageButton);