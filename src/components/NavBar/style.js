import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: auto;

    left: 0;
    right: 0;
    bottom: 0px;
    z-index: 10;

    transition: bottom 0.3s;

    &.hide{
        bottom: -70px;
    }

    .buttons-container{
        height: 50px;
        width: 100%;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: ${props => props.theme.colors.secondary_background};
    }
`