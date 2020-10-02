import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility, showPages } from "../../store/actions/menuActions";

import IconButton from "../IconButton";
import If from "../../operator/If";

const SettingsReaderButton = props => {
    const visible = props.tabsVisible[props.target] === true

    function toggleMenu() {
        if(!props.menu.visibility === true){
            props.showPages(['reader'])
        }
        props.setVisibility(!props.menu.visibility)
    }

    return (
        <If test={visible}>
            <div className="settings-reader-button" onClick={toggleMenu}>
                <IconButton icon="cog" label={props.label}></IconButton>
            </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, menu: state.menu})
const mapDispatchToProps = dispatch => bindActionCreators({setVisibility, showPages}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SettingsReaderButton);