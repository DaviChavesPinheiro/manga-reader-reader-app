import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "./store/actions/menuActions";
import { setTheme } from "./store/actions/geralActions";
import { setImageBrightness, setImageZoom } from "./store/actions/readerActions";
import SearchBar from "./components/SearchBar";
import { Switch, Route } from "react-router-dom";

import Home from "./template/Home";
import MangaPage from "./template/MangaPage";
import FavoritePage from "./template/FavoritePage";
import RecentPage from "./template/RecentPage";
import NavBar from "./template/NavBar";
import Content from "./template/Content";
import ReaderPage from "./template/ReaderPage";

import MoreButton from "./components/NavBar/MoreButton";
import SearchButton from "./components/NavBar/SearchButton";
import HomePageButton from "./components/NavBar/HomePageButton";
import FavoriteButton from "./components/NavBar/FavoriteButton";
import MangaPageButton from "./components/NavBar/MangaPageButton";
import RecentPageButton from "./components/NavBar/RecentPageButton";
import FavoritePageButton from "./components/NavBar/FavoritePageButton";
import SettingReaderButton from "./components/NavBar/SettingsReaderButton";
import Menu from "./template/Menu";
import Main from "./components/menu/Main/index";
import Reader from "./components/menu/Reader/index";
import Theme from "./components/menu/Theme/index";

import GlobalStyle from "./styles/global";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import { ThemeProvider } from "styled-components";

const App = props => {

    useEffect(() => {
        props.showPages(['main'])

        const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
        props.setImageBrightness(settings.imagesBrightness || 100)
        props.setImageZoom(settings.imagesZoom || 100)
        props.setTheme(settings.theme || 'dark')
    }, [])

    function getTheme(theme) {
        switch (theme) {
            case dark.title:
                return dark
            case light.title:
                return light
            default:
                return dark;
        }
    }

    return (
        <div className="App">
            <ThemeProvider theme={getTheme(props.geral.theme)}>
                <SearchBar></SearchBar>
                <Content>
                    <Switch>
                        <Route path="/mangas/favorites" component={FavoritePage}></Route>
                        <Route path="/mangas/recent" component={RecentPage}></Route>
                        <Route path="/manga/:idManga/chapters/:idChapter" component={ReaderPage}></Route>
                        <Route path="/manga/:idManga" component={MangaPage}></Route>
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </Content>
                <NavBar>
                    <SearchButton target="search" label="Search"></SearchButton>
                    <FavoriteButton manga={props.mangaSelected} target="favorite" label="Favorite"></FavoriteButton>
                    <FavoritePageButton target="favoritePages" label="Favorites"></FavoritePageButton>
                    <HomePageButton target="home" label="Home"></HomePageButton>
                    <MangaPageButton target="manga" label="Manga"></MangaPageButton>
                    <RecentPageButton target="recentPages" label="Recent"></RecentPageButton>
                    <MoreButton target="more" label="More"></MoreButton>
                    <SettingReaderButton target="settingsReader" label="Settings"></SettingReaderButton>
                </NavBar>
                <Menu>
                    <Main target="main"></Main>
                    <Reader target="reader"></Reader>
                    <Theme target="theme"></Theme>
                </Menu>
                <GlobalStyle></GlobalStyle>
            </ThemeProvider>
        </div>
    )
}

const mapStateToProps = state => ({ mangaSelected: state.manga.selected, geral: state.geral})
const mapDispatchToProps = dispatch => bindActionCreators({ showPages, setImageBrightness, setImageZoom, setTheme }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);