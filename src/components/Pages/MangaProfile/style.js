import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-bottom: 70px;
`

const Section = styled.section`
    width: 100%;
    background-color: ${props => props.theme.colors.secondary_background};

    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    h2 {
        color: ${props => props.theme.colors.primary_color};
        font-size: 1.2em;
    }
`

export const Main = styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60vmax;

    .banner-container {
        width: 100%;
        height: 33%;
        overflow: hidden;

        img {
            width: 100%;

        filter: blur(4px);
        -webkit-filter: blur(4px);
        }
    }

    .main-info{
        height: 50%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        h1, span {
            width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }

        h1 {
            color: ${props => props.theme.colors.primary_color};
            margin: 0px;
            font-size: 1.5em;
            font-weight: 500;
        }

        span {
            color: ${props => props.theme.colors.tertiary_color};
            font-weight: 500;
        }

        .img-container {
            height: 70%;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;

            img {
                box-sizing: content-box;
                position: absolute;
                top: -60px;
                max-width: 130px;
                width: 33%;

                border: 9px solid ${props => props.theme.colors.secondary_background};
                
                border-radius: 5px;
            }
        }
    }

    .buttons-container {
        margin: 10px 0px;
        display: flex;
        justify-content: space-around;
    }
`

export const Description = styled(Section)`
    padding: 10px 10px;
    font-size: 1.1em;
    color: ${props => props.theme.colors.tertiary_color};

    h2 {
        margin-bottom: 5px;
    }
`

export const Chapters = styled(Section)`
    padding: 10px 10px;
    font-size: 1.1em;

    h2 {
        padding-left: 0.5em;
    }

    ul {
        list-style: none;
        padding-left: 1em;
    }

    ul.shrinked li:nth-child(n+6){
        display: none;
    }

    li {
        padding: 0.5em 0px;
        display: flex;
        justify-content: stretch;
        align-items: center;

        a {
            color: ${props => props.theme.colors.primary_color};
            flex: 1;
        }

        i {
            color: transparent;
            font-size: 1.1em;
        }
    }

    li.readed {
        a{
            color: #707070;
            flex: 1;
        }
        i {
            color: ${props => props.theme.colors.tertiary_color};
        }
    }
`

export const Recommendations = styled(Section)`
    padding: 10px 0px;

    > h2 {
        padding: 0px 10px;
    }

    ul {
        width: 100%;
        list-style: none;
        padding: 0px;
    }
`
export const Characters = styled(Section)`
    padding: 10px 0px;

    > h2 {
        padding: 0px 10px;
    }

    ul {
        width: 100%;
        list-style: none;
        padding: 0px;
    }
    ul.shrinked li:nth-child(n+4) {
        display: none;
    }
`

export const ShowMore = styled.button`
    color: ${props => props.theme.colors.primary_color};
    background-color: ${props => props.theme.colors.secondary_color};
    width: 100%;
    padding: 6px 0px;
    margin: 0 auto;
`



