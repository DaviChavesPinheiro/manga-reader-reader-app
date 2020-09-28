import React, { useState, useEffect } from "react";
import axios from "axios";

import LazyLoad from 'react-lazyload';
import MangaCard from '../MangaCard'
import If from "../../operator/If";
import Loading from "../utils/Loading";

const PopularMangasPage = props => {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        if (props.show === true && mangas.length === 0) {
            axios.get(`https://charlotte-services.herokuapp.com/mangas/?sort=-members`).then(res => {
                setMangas(res.data)
                // if (Object.keys(props.selected).length === 0)
                //     props.selectManga(res.data[0])
            })
        }
    }, [props.show])

    return (
        <div className={`popular manga-list-container ${props.show ? '' : 'hidden'}`}>
            <If test={!mangas.length}>
                <Loading></Loading>
            </If>
            <ul className="manga-list">
                {mangas.map((manga, index) => (
                    <LazyLoad key={manga._id} height={900}>
                        <MangaCard manga={manga} rank={index + 1}></MangaCard>
                    </LazyLoad>
                ))}
            </ul>
        </div>
    )
}

export default PopularMangasPage;