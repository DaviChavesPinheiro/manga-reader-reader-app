import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import If from "../../../operator/If";
import useMangaInfo from "../../../hooks/useMangaInfo";
import { IconLink } from "../style";

const ReadButton = props => {
    const {mangasInfo} = useMangaInfo()
    const [lastChapter, setLastChapter] = useState(getRecentChapterReaded(props.manga.selected._id)) 
    const visible = props.navBar.tabsVisible[props.target] === true

    useEffect(() => {
        setLastChapter(getRecentChapterReaded(props.manga.selected._id))
        console.log("readbutton useEffect", getRecentChapterReaded(props.manga.selected._id))
    }, [mangasInfo[props.manga.selected._id]])

    function getRecentChapterReaded(mangaId) {
        const manga = mangasInfo[mangaId]
        if(!manga) return 0

        return manga.recentChapter ? manga.recentChapter.index : 0
    }
    return (
        <If test={visible}>
            <IconLink to={`/manga/${props.manga.selected._id}/chapters/${lastChapter}`} className={props.expanded ? 'expanded' : ''}>
                <i className="fa fa-play"></i>
                <span>{props.label}</span>
            </IconLink>
        </If>
    )
}
const mapStateToProps = state => ({ navBar: state.navBar, manga: state.manga })

export default connect(mapStateToProps)(ReadButton);