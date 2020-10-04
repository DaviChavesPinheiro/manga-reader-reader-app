import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility, showPages } from "../../../store/actions/menuActions";

import If from "../../../operator/If";
import { IconButton } from "../style";

const SettingsReaderButton = props => {
    const visible = props.navBar.tabsVisible[props.target] === true

    function toggleMenu() {
        if(!props.menu.visibility === true){
            props.showPages(['reader'])
        }
        props.setVisibility(!props.menu.visibility)
    }

    return (
        <If test={visible}>
            <IconButton onClick={toggleMenu} className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-cog"></i>
                <span>{props.label}</span>
            </IconButton>
        </If>
    )
}
const mapStateToProps = state => ({ navBar: state.navBar, menu: state.menu})
const mapDispatchToProps = dispatch => bindActionCreators({setVisibility, showPages}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SettingsReaderButton);