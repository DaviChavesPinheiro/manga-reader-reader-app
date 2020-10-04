import React from "react";
import { connect } from "react-redux";

import If from "../../../operator/If";
import { IconLink } from "../style";

const MangaPageButton = props => {

    const visible = props.navBar.tabsVisible[props.target] === true
    return (
        <If test={visible}>
            <IconLink to={`/manga/${props.manga.selected._id}`} className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-book"></i>
                <span>{props.label}</span>
            </IconLink>
        </If>
    )
}
const mapStateToProps = state => ({ navBar: state.navBar, manga: state.manga })

export default connect(mapStateToProps)(MangaPageButton);