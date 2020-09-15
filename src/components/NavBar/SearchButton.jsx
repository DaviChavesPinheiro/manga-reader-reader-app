import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility } from "../../store/actions/searchBarActions";

import IconButton from "../IconButton";
import If from "../../operator/If";

const SearchButton = props => {
    const visible = props.tabsVisible[props.target] === true

    function toggleSearchBar() {
        props.setVisibility(!props.show)
    }
    return (
        <If test={visible}>
            <div className="search-button" onClick={toggleSearchBar}>
                <IconButton icon="search" label={props.label}></IconButton>
            </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, show: state.searchBar.show })

const mapDispatchToProps = dispatch => bindActionCreators({ setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);