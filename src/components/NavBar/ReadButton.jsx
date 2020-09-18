import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";
import { Link } from "react-router-dom";
import useMangaInfo from "../../hooks/useMangaInfo";

const ReadButton = props => {
    const {mangasInfo} = useMangaInfo()
    const [lastChapter, setLastChapter] = useState(mangasInfo[props.selected._id] ? mangasInfo[props.selected._id].lastChapter : 0) 
    const visible = props.tabsVisible[props.target] === true

    useEffect(() => {
        setLastChapter(mangasInfo[props.selected._id] ? mangasInfo[props.selected._id].lastChapter : 0)
    }, [mangasInfo[props.selected._id]])
    return (
        <If test={visible}>
            <Link to={`/manga/${props.selected._id}/chapters/${lastChapter}`}>
                <div className="read-button" >
                    <IconButton icon="play" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, selected: state.manga.selected })

export default connect(mapStateToProps)(ReadButton);