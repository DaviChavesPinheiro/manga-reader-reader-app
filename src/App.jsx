import React from "react";
import { connect } from "react-redux";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Home from "./template/Home";
import MangaPage from "./template/MangaPage";
import FavoritePage from "./template/FavoritePage";
import SideBar from "./template/SideBar";
import Content from "./template/Content";
import ReaderPage from "./template/ReaderPage";

import IconButton from './components/IconButton'
import HomePageButton from "./components/sideBar/HomePageButton";
import FavoriteButton from "./components/sideBar/FavoriteButton";
import FavoritePageButton from "./components/sideBar/FavoritePageButton";

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
            <SideBar side="left">
                <IconButton icon="search"></IconButton>
                <IconButton icon="bell-o"></IconButton>
                <IconButton icon="bell-o"></IconButton>
                <IconButton icon="bell-o"></IconButton>
                <IconButton icon="bell-o"></IconButton>
                <FavoriteButton manga={props.mangaSelected}></FavoriteButton>
                <IconButton icon="arrow-left"></IconButton>
            </SideBar>
            <Content>
                <Switch>
                    <Route path="/mangas/favorites" component={FavoritePage}></Route>
                    <Route path="/manga/:idManga/chapters/:idChapter" component={ReaderPage}></Route>
                    <Route path="/manga/:idManga" component={MangaPage}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </Content>
            <SideBar side="right">
                <HomePageButton></HomePageButton>
                <IconButton icon="history"></IconButton>
                <FavoritePageButton></FavoritePageButton>
                <IconButton icon="bell-o"></IconButton>
                <IconButton icon="bell-o"></IconButton>
                <IconButton icon="gear"></IconButton>
                <IconButton icon="arrow-right"></IconButton>
            </SideBar>
        </div>
    )
}

const mapStateToProps = state => ({ mangaSelected: state.manga.selected })

export default connect(mapStateToProps)(App);