import React, { useState, useEffect } from "react";
import axios from "axios";

import LazyLoad from 'react-lazyload';
import MangaCard from '../Cards/MangaCard'
import If from "../../operator/If";
import Loading from "../utils/Loading";

// import MangaCard2 from "../Cards/MangaCard";

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
            console.log(entry)
            loadPage(pageIndex + 1)
            setPageIndex(pageIndex + 1)
            observer.unobserve(entry.target)
        });
    }

    function loadPage(page) {
        console.log("loadmangas", page)
        axios.get(`https://charlotte-services.herokuapp.com/mangas/?sort=-score&&page=${page}`).then(res => {
            if(res.data && res.data.length > 0){
                console.log(res.data)
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
                        {/* <button onClick={() => loadMangas(page + 1)}>Load Next Mangas</button> */}
                    </div>
                </ul>
            ))}
        </div>
    )
}

export default AllMangasPage;