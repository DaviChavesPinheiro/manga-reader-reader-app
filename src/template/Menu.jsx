import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility } from "../store/actions/menuActions";
import "./Menu.css";

const Menu = props => {
    const activityPages = props.menu.activityPages

    useEffect(() => {
        if(activityPages.length === 0){
            props.setVisibility(false)
        }
    }, [activityPages.length])

    
    return (
        <div className={`menu ${props.menu.visibility ? 'show' : ''}`}>
            {props.children}
        </div>
    )
}

const mapStateToProps = state => ({menu: state.menu})
const mapDispatchToProps = dispatch => bindActionCreators({setVisibility}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu);