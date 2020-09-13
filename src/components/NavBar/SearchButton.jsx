import React from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";

const SearchButton = props => {
    const visible = props.tabsVisible[props.target] === true
    return (
        <If test={visible}>
                <div className="search-button">
                    <IconButton icon="search" label={props.label}></IconButton>
                </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(SearchButton);