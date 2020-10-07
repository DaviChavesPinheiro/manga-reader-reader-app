import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "./store/actions/menuActions";
import { setTheme } from "./store/actions/geralActions";
import { setImageBrightness, setImageZoom } from "./store/actions/readerActions";
import SearchBar from "./components/Search";
import { Switch, Route } from "react-router-dom";

import Home from "./template/Home";
import MangaPage from "./template/MangaPage";
import CharacterPage from "./template/CharacterPage";
import FavoritePage from "./template/FavoritePage";
import RecentPage from "./template/RecentPage";
import NavBar from "./components/NavBar";
import Content from "./template/Content";
import ReaderPage from "./template/ReaderPage";

import MoreButton from "./components/Buttons/MoreButton";
import SearchButton from "./components/Buttons/SearchButton";
import HomePageButton from "./components/Buttons/HomePageButton";
import MangaPageButton from "./components/Buttons/MangaPageButton";
import RecentPageButton from "./components/Buttons/RecentPageButton";
import FavoritePageButton from "./components/Buttons/FavoritePageButton";
import SettingReaderButton from "./components/Buttons/SettingsReaderButton";
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
                        <Route path="/character/:idCharacter" component={CharacterPage}></Route>
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </Content>
                <NavBar>
                    <SearchButton target="search" label="Pesquisar" expanded={true}></SearchButton>
                    <FavoritePageButton target="favoritePages" label="Favoritos" expanded={true}></FavoritePageButton>
                    <HomePageButton target="home" label="Home" expanded={true}></HomePageButton>
                    <MangaPageButton target="manga" label="Mangá" expanded={true}></MangaPageButton>
                    <RecentPageButton target="recentPages" label="Recente" expanded={true}></RecentPageButton>
                    <MoreButton target="more" label="Mais" expanded={true}></MoreButton>
                    <SettingReaderButton target="settingsReader" label="Configurações" expanded={true}></SettingReaderButton>
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