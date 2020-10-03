import styled from "styled-components";


export const HorizontalCardContainer = styled.div`

    width: 100%;
    height: 130px;

    overflow: hidden;
    border-bottom: 1px solid ${props => props.theme.colors.secondary_color};
    background-color: ${props => props.theme.colors.secondary_background};

    position: relative;

    a:first-child {
        display: flex;
        align-items: center;
        height: 100%;

        .img-container {
            width: 73px;
            height: 110px;

            margin: 0px 15px;
            border-radius: 2px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info {
            height: 100%;
            width: calc(100% - 103px);

            padding: 15px 0px;
            padding-right: 30px;
            font-weight: 400;

            display: flex;
            flex-direction: column;

            h2{
                color: ${props => props.theme.colors.primary_color};
                font-weight: 400;
                margin: 0px;
                font-size: 1.2em;
                flex: 1;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            span {
                color: ${props => props.theme.colors.tertiary_color};
                display: block;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }
    }
    a.secondary-link {
        position: absolute;
        padding: 10px 15px;
        right: 0;
        top: 0;
        font-size: 1.2em;
        color: ${props => props.theme.colors.secondary_color};
    }

`