import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility } from "../../../store/actions/searchBarActions";

import If from "../../../operator/If";
import { IconButton } from "../style";
const SearchButton = props => {
    const visible = props.navBar.tabsVisible[props.target] === true

    function toggleSearchBar() {
        props.setVisibility(!props.searchBar.show)
    }
    return (
        <If test={visible}>
            <IconButton onClick={toggleSearchBar} className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-search"></i>
                <span>{props.label}</span>
            </IconButton>
        </If>
    )
}
const mapStateToProps = state => ({ navBar: state.navBar, searchBar: state.searchBar })

const mapDispatchToProps = dispatch => bindActionCreators({ setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);