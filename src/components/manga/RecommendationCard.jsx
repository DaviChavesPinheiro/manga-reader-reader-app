import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { selectManga } from "../../store/actions/mangaActions";
import { connect } from "react-redux";
import "./RecommendationCard.css";

const RecommendationCard = props => {
    const manga = props.manga
    function onClick() {
        props.selectManga(manga)
    }

    return (
        <div className="recommendation-card">
            <Link to={`/manga/${manga._id}`} onClick={onClick}>
                <img src={manga.image_url} alt="Manga" />
                <div className="info">
                    <h3 className="title">{manga.title}</h3>
                    <span className="sub-info">Votes: {manga.recommendation_count}</span>
                </div>
            </Link>
        </div>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({ selectManga }, dispatch)

export default connect(null, mapDispatchToProps)(RecommendationCard);