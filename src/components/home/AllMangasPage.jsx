import React, { useState, useEffect } from "react";
import axios from "axios";

import LazyLoad from 'react-lazyload';
import MangaCard from '../Cards/MangaCard'
import If from "../../operator/If";
import Loading from "../utils/Loading/index";

import Divider from "../utils/Divider";

const AllMangasPage = props => {
    const [pages, setPages] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    let observer = new IntersectionObserver(onIntersectionObserver, {
        threshold: 0.05,
        rootMargin: "1000px"
    });
    useEffect(() => {
        if (props.show === true) {
            loadPage(pageIndex)
        }
    }, [])
    useEffect(() => {
        if(pages.length === 0) return
        observer.observe(document.querySelector(`#page-${pages[pages.length - 1].index} .end-area`))
    }, [pages])

    function onIntersectionObserver(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            loadPage(pageIndex + 1)
            setPageIndex(pageIndex + 1)
            observer.unobserve(entry.target)
        });
    }

    function loadPage(page) {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/?sort=-score&&page=${page}`).then(res => {
            if(res.data && res.data.length > 0){
                setPages([...pages, {index: page, mangas: res.data}])
            }
            
        })
    }

    return (
        <div className={`all manga-list-container ${props.show ? '' : 'hidden'}`}>
            <If test={!pages.length}>
                <Loading></Loading>
            </If>
            {pages.map(page => (
                <ul className="manga-list" key={page.index} id={`page-${page.index}`}>
                    {page.mangas.map((manga, index) => (
                        <LazyLoad key={manga._id} height={210}>
                            <MangaCard manga={manga}></MangaCard>
                        </LazyLoad>
                    ))}
                    <div className="end-area">
                        <Divider label={`${page.index}#`}></Divider>
                    </div>
                </ul>
            ))}
        </div>
    )
}

export default AllMangasPage;