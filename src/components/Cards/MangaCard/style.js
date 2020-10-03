import styled from "styled-components";

export const Card = styled.div`
    /* max-width: calc(33vw - 4*3px); */
    width: 110px;
    height: 220px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 2px 3px;

    display: flex;
    flex-direction: column;

    overflow: hidden;
    
    background-color: ${props => props.theme.colors.secondary_background};

    .img-container{
        width: 100%;
        height: 65%;
        overflow: hidden;

        img {
            width: 100%;
            min-height: 100%;
        }

    }

    .info {
        width: 100%;
        height: 35%;
        overflow: hidden;
        padding: 6px;

        font-weight: 400;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h2 {
            color: ${props => props.theme.colors.primary_color};
            text-overflow: ellipsis;
            width: 100%;
            line-height: 1.4em;
            max-height: calc(1.4em * 2);
            font-weight: 400;
            margin: 0px;
            font-size: 1.1em;
            overflow: hidden;
            
        }
        span {
            color: ${props => props.theme.colors.tertiary_color};
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`