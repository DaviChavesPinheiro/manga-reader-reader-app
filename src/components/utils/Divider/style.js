import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

export const Line = styled.hr`
    flex: 1;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.text.tertiary};
    margin: auto 10px;
`

export const Label = styled.span`
    color: ${props => props.theme.colors.text.tertiary};
    margin: 0px;
`