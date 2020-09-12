import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectManga } from "../store/actions/mangaActions";
import axios from "axios";
import "./Home.css";



import MangaCard from '../components/MangaCard'
const Home = props => {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        axios.get(`https://charlotte-services.herokuapp.com/mangas`).then(res => {
            setMangas(res.data)
            if(Object.keys(props.selected).length === 0)
                props.selectManga(res.data[0])
        })
    }, [])

    return (
        <div className="home">
            
            <div className="manga-list-container">
                <ul className="manga-list">
                    {mangas.map((manga, index) => <MangaCard key={manga._id} manga={manga} rank={index + 1}></MangaCard>)}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ selected: state.manga.selected })
const mapDispatchToProps = dispatch => bindActionCreators({ selectManga }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);