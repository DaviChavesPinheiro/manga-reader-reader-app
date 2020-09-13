import React from "react";
import { connect } from "react-redux";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./template/Home";
import MangaPage from "./template/MangaPage";
import FavoritePage from "./template/FavoritePage";
import NavBar from "./template/NavBar";
import Content from "./template/Content";
import ReaderPage from "./template/ReaderPage";

import IconButton from './components/IconButton'
import MoreButton from "./components/NavBar/MoreButton";
import PlayButton from "./components/NavBar/PlayButton";
import SearchButton from "./components/NavBar/SearchButton";
import HomePageButton from "./components/NavBar/HomePageButton";
import FavoriteButton from "./components/NavBar/FavoriteButton";
import FavoritePageButton from "./components/NavBar/FavoritePageButton";

const App = props => {

    function onSearch(value) {
        axios.get(`https://charlotte-services.herokuapp.com/mangas/?title__regex=/${value}/i&&sort=rank`).then(res => {
            console.log("Data: ", res.data)
        })
    }

    return (
        <div className="App">
            {/* <SearchBar onSearch={onSearch}></SearchBar>
             */}
            <Content>
                <Switch>
                    <Route path="/mangas/favorites" component={FavoritePage}></Route>
                    <Route path="/manga/:idManga/chapters/:idChapter" component={ReaderPage}></Route>
                    <Route path="/manga/:idManga" component={MangaPage}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </Content>
            <NavBar position="bottom">
                <SearchButton target="search"></SearchButton>
                <HomePageButton target="home"></HomePageButton>
                <PlayButton target="play"></PlayButton>
                <FavoriteButton manga={props.mangaSelected} target="favorite"></FavoriteButton>
                <FavoritePageButton target="favoritePages"></FavoritePageButton>
                <MoreButton target="more"></MoreButton>
            </NavBar>
        </div>
    )
}

const mapStateToProps = state => ({ mangaSelected: state.manga.selected })

export default connect(mapStateToProps)(App);