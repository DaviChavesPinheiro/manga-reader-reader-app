import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: auto;

    i {
        color: ${props => props.theme.colors.secondary_color};
        animation: spin 2s linear infinite;
        font-size: 2em;
    }
`

const Loading = props => {

    return (
        <Container style={{height: props.height, width: props.width}}>
            <i className="fa fa-circle-o-notch" style={{color: props.color, fontSize: props.fontSize}}></i>
        </Container>
    )
}

export default Loading;