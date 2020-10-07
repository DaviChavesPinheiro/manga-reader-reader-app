import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVisibility } from "../store/actions/menuActions";
import styled from 'styled-components';

const Container = styled.div`
    width: 0px;
    max-width: 90%;
    position: fixed;
    z-index: 11;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.colors.gradient[0]};
    overflow-x: hidden;
    transition: width 0.5s;

    &.show {
        width: 400px;
    }
`

const Menu = props => {
    const activityPages = props.menu.activityPages

    useEffect(() => {
        if (activityPages.length === 0) {
            props.setVisibility(false)
        }
    }, [activityPages.length])



    return (
        <Container className={props.menu.visibility ? 'show' : ''}>
            {props.children}
        </Container>
    )
}

const mapStateToProps = state => ({ menu: state.menu })
const mapDispatchToProps = dispatch => bindActionCreators({ setVisibility }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
