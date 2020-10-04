import React from "react";
import { connect } from "react-redux";

import If from "../../../operator/If";
import { IconLink } from "../style";

const RecentPageButton = props => {
    const visible = props.tabsVisible[props.target] === true

    return (
        <If test={visible}>
            <IconLink to="/mangas/recent" className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-history"></i>
                <span>{props.label}</span>
            </IconLink>
        </If>
    )
}

const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(RecentPageButton);