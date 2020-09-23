import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSettingsVisibility } from "../../store/actions/readerActions";

import IconButton from "../IconButton";
import If from "../../operator/If";

const SettingsReaderButton = props => {
    const visible = props.tabsVisible[props.target] === true

    function toggleMenu() {
        props.setSettingsVisibility(!props.settingsVisibility)
    }

    return (
        <If test={visible}>
            <div className="settings-reader-button" onClick={toggleMenu}>
                <IconButton icon="cog" label={props.label}></IconButton>
            </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, settingsVisibility: state.reader.settingsVisibility })
const mapDispatchToProps = dispatch => bindActionCreators({setSettingsVisibility}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SettingsReaderButton);