import styled from "styled-components";

export const FixedContainer = styled.div`
    display: none;
    width: 100vw;
    position: fixed;
    left: 0px;
    top: 0px;
    padding-right: 5px;
    padding-top: 5px;
    z-index: 10;

    max-height: calc(100vh - 70px);
    overflow-y: scroll;
    overflow-x: hidden;

    background: ${props => props.theme.colors.secondary_background};

    &.active {
        display: flex;
        flex-direction: column;
    }
` 


export const SearchBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
` 

export const SearchInput = styled.input.attrs({type: "text", placeholder: "Naruto, One Piece, Berserk..."})`
    height: 42px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.tertiary_color};
    background-color: transparent;
    color: ${props => props.theme.colors.primary_color};

    -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
    flex: 1;

    padding: 0px 7px;

    

    outline: none;
` 

export const ListContainer = styled.div`
    padding: 5px 5px 5px 0px;

    ul {
        margin: 0px;
        padding: 5px 10px;
        list-style: none;

        li {
            padding: 8px 0px;
            font-size: 1.2em;
            color: ${props => props.theme.colors.primary_color};
            border-bottom: 1px solid #646464;
        }
    }
`

