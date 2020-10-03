import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../../../store/actions/mangaActions";
import { Link } from "react-router-dom";

import { Card } from "./style";

const MangaCard = props => {
    const manga = props.manga
    function onClick() {
        props.selectManga(manga)
    }
    
    return (
        <Link to={`/manga/${manga._id}`} onClick={onClick}>
            <Card>
                <div className="img-container">
                    <img src={manga.image_url} alt="Manga"/>
                </div>
                <div className="info">
                    <h2>{manga.title}</h2>
                    <span>Score: {manga.score.toFixed(2)}</span>
                </div>
            </Card>
        </Link>
    )
}

const mapStateTopProps = state => ({selected: state.manga.selected})

const mapDispatchToProps = dispatch => bindActionCreators({selectManga}, dispatch)

export default connect(mapStateTopProps, mapDispatchToProps)(MangaCard);