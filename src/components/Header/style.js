import styled from "styled-components";

export const Container = styled.header`
    width: 100%;
    background-color: ${props => props.theme.colors.secondary_background};
`

export const HeaderContainer = styled(Container)`
    display: flex;
    align-items: center;

    padding: 4px 6px 4px 10px;
    color: ${props => props.theme.colors.primary_color};

    h1 {
        flex: 1;
        font-size: 1.5em;
        font-weight: 600;
        margin: 4px 0px;
        color: ${props => props.theme.colors.primary_color};
    }

`
export const TabsContainer = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colors.secondary_background};
    display: flex;
`
export const Tab = styled.button`
    flex: 1;
    
    color: ${props => props.theme.colors.secondary_color};
    padding: 3px 5px;
    transition: 0.3s;
    background-color: transparent;
    border-bottom: 3px solid transparent;

    font-size: 0.9em;
    text-align: center;

    &.active {
        border-bottom: 3px solid ${props => props.theme.colors.primary_color};
        color: ${props => props.theme.colors.primary_color};
    }
`