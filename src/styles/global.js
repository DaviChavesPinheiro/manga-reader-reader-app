import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    :root {
        --main-color-black: #000000;
        --main-color-light-black: #1e1e1e;
        --main-color-white: #FEFEFE;
        --main-color-gray: #9E9E9E;
        --main-color-light-gray: #c5c5c5;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html,
    body,
    .root,
    .App {
        width: 100%;
        min-height: 100vh;
        background-color: ${props => props.theme.colors.background};
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
        background: transparent;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
    }

    button:active {
        outline: none;
        border: none;
    }

    button:focus {
        outline: 0;
    }

`;