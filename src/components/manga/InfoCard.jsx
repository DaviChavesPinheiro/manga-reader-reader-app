import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { selectManga } from "../../store/actions/mangaActions";
import { connect } from "react-redux";
import "./InfoCard.css";

const InfoCard = props => {
    const manga = props.manga
    function onClick(event) {
        // event.preventDefault()
        props.selectManga(manga)
    }

    return (
        <div className="info-card">
            <Link to={`/manga/${manga._id}`} onClick={onClick}>
                <img src={props.image} alt="Manga" />
                <div className="info">
                    <h3 className="title">{props.title}</h3>
                    {props.info.map((text, index) => <span key={index} className="sub-info">{text}</span>)}
                </div>
            </Link>
        </div>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({ selectManga }, dispatch)

export default connect(null, mapDispatchToProps)(InfoCard);