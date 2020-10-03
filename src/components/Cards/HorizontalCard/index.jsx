import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../../../store/actions/mangaActions";
import { Link } from "react-router-dom";
import If from "../../../operator/If";

import { HorizontalCardContainer } from "./style";

const HorizontalCard = props => {
    const manga = props.manga
    function onClick() {
        props.selectManga(manga)
    }

    return (
        <HorizontalCardContainer>
            <Link to={props.primary_link} onClick={onClick}>
                <div className="img-container">
                    <img src={props.image} alt="Manga" />
                </div>
                <div className="info">
                    <h2>{props.title}</h2>
                    {props.info.map((text, index) => <span key={index}>{text}</span>)}
                </div>
            </Link>
            <If test={props.secondary_link}>
                <Link to={props.secondary_link || "/"} onClick={onClick} className="secondary-link">
                    <button><i className="fa fa-ellipsis-v"></i></button>
                </Link>
            </If>
        </HorizontalCardContainer>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({ selectManga }, dispatch)

export default connect(null, mapDispatchToProps)(HorizontalCard);