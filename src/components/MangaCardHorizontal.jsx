import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectManga } from "../store/actions/mangaActions";
import { Link } from "react-router-dom";
import "./MangaCardHorizontal.css";

const MangaCardHorizontal = props => {
    const manga = props.manga
    function onClick() {
        props.selectManga(manga)
    }

    return (
        <div className="manga-card-horizontal">
            <Link to={`/manga/${manga._id}/chapters/${manga.recentChapter.index || 0}`} onClick={onClick}>
                <img src={manga.image_url} alt="Manga" />
                <div className="info">
                    <h3 className="title">{manga.title}</h3>
                    <span className="sub-info">{manga.recentChapter ? manga.recentChapter.title : ''}</span>
                    <span className="sub-info">{manga.lastViewedDate}</span>
                </div>
            </Link>
            <Link to={`/manga/${manga._id}`} onClick={onClick}>
                <button><i className="fa fa-ellipsis-v"></i></button>
            </Link>
        </div>
    )
}

const mapStateTopProps = state => ({ selected: state.manga.selected })

const mapDispatchToProps = dispatch => bindActionCreators({ selectManga }, dispatch)

export default connect(mapStateTopProps, mapDispatchToProps)(MangaCardHorizontal);