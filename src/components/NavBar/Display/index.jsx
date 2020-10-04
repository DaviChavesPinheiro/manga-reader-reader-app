import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    height: 1.4em;
    font-size: 0.7em;
    color: ${props => props.theme.colors.secondary_color};
    display: flex;
    justify-content: center;

    text-overflow: ellipsis;
    overflow: hidden;
    background-color: ${props => props.theme.colors.secondary_background};

    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`

const Display = props => {

    return (
        <Container>
            {props.displayLabel}
        </Container>
    )
}

const mapStateToProps = state => ({displayLabel: state.navBar.displayLabel})

export default connect(mapStateToProps)(Display);