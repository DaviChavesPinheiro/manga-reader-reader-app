import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";

const RecentPageButton = props => {
    const visible = props.tabsVisible[props.target] === true

    return (
        <If test={visible}>
            <Link to="/mangas/recent">
                <div className="recent-page-button">
                    <IconButton icon="history" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}

const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(RecentPageButton);