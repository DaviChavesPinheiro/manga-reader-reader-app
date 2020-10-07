import styled from "styled-components";
import { Link } from "react-router-dom";

export const IconButton = styled.button`
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: ${props => props.theme.colors.text.secondary};

    &.expanded{
        flex: 1;
    }

    i{
        font-size: 1.5em;
        margin-top: 3px;
        color: ${props => props.color || props.theme.colors.text.secondary};
    }

    span{
        font-size: 0.75em;
        margin: 0px;
        margin-top: 3px;
    }
`

export const IconLink = styled(Link)`
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: ${props => props.theme.colors.text.secondary};

    &.expanded{
        flex: 1;
    }
    &:hover{
        color: ${props => props.theme.colors.text.secondary};
    }

    i{
        font-size: 1.5em;
        margin-top: 3px;
        color: ${props => props.color || props.theme.colors.text.secondary};
    }

    span{
        font-size: 0.75em;
        margin: 0px;
        margin-top: 3px;
    }
`