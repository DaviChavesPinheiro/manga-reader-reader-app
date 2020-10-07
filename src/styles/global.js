import styled, { createGlobalStyle } from "styled-components";
import RobotoMedium from "../fonts/Roboto-Medium.ttf";
import RobotoRegular from "../fonts/Roboto-Regular.ttf";
import RobotoLight from "../fonts/Roboto-Light.ttf";

export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    @font-face {
        font-family: "Roboto-Medium";
        src: url(${RobotoMedium});
    }
    @font-face {
        font-family: "Roboto-Regular";
        src: url(${RobotoRegular});
    }
    @font-face {
        font-family: "Roboto-Light";
        src: url(${RobotoLight});
    }

    :root {
        --main-color-black: #000000;
        --main-color-light-black: #1e1e1e;
        --main-color-white: #FEFEFE;
        --main-color-gray: #9E9E9E;
        --main-color-light-gray: #c5c5c5;
    }

    body {
        font-family: "Roboto-Regular", "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: "Roboto-Light";
    }
    span, button {
        font-family: "Roboto-Medium";
    }

    html,
    body,
    .root,
    .App {
        width: 100%;
        min-height: 100vh;
        background-color: ${props => props.theme.colors.gradient[0]};
    }

    .hidden {
        display: none;
    }

    button {
        background: transparent;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
    }

    button:hover {
        
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
    }

    button:active {
        background: ${props => props.theme.colors.gradient[3]};
        outline: none;
        border: none;
    }

    button:focus {
        outline: 0;
    }

`;

export const Button = styled.button`
    background-color: ${props => props.theme.colors.gradient[1]};
    border: 1px solid ${props => props.theme.colors.text.tertiary};
    border-radius: 3px;
    margin: 0px 10px;

    font-size: 1.1em;
    color: var(--main-color-gray);
    padding: 3px 0px;

    &.expanded {
        width: calc(100% - 10px);
    }
    
    &.flex {
        flex: 1;
    }

    &.actived {
        border: 1px solid ${props => props.theme.colors.gradient[12]};
        color: ${props => props.theme.colors.gradient[12]};
    }

    :hover{
        border: 1px solid ${props => props.theme.colors.gradient[12]};
        color: ${props => props.theme.colors.gradient[12]};
    }
`