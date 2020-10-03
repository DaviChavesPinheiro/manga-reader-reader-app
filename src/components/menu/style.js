import styled from "styled-components";

export const Header = styled.header`
    height: 60px;
    width: 100%;

    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.secondary_background};
`

export const Section = styled.section`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 15px;

    border-bottom: 2px solid ${props => props.theme.colors.secondary_background};
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 400px;
`
export const HorizontalContainer = styled(Container)`
    flex-direction: row;
`

export const Close = styled.button`
    font-size: 2.4em;
    margin-left: 15px;
    color: ${props => props.theme.colors.primary_color};
`

export const MainTitle = styled.h2`
    flex: 1;
    color: ${props => props.theme.colors.tertiary_color};
    margin: 0px;
    margin-right: 20px;
    font-weight: 500;
    text-align: right;
    white-space: nowrap;
`
export const Title = styled.h3`
    color: ${props => props.theme.colors.tertiary_color};
    font-size: 1em;
    margin-bottom: 15px;
    white-space: nowrap;
`
export const Item = styled.button`
    color: ${props => props.theme.colors.primary_color};
    font-size: 1.4em;
    margin-bottom: 10px;
    white-space: nowrap;
    i{
        width: 40px;
        padding-right: 20px;
        text-align: center;
    }
`

