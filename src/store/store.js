import { createStore, combineReducers } from "redux";

import searchBarReducer from "./reducers/searchBarReducer";
import mangaReducer from "./reducers/mangaReducer";
import navBarReducer from "./reducers/navBarReducer";
import menuReducer from "./reducers/menuReducer";
import geralReducer from "./reducers/geralReducer";
import readerReducer from "./reducers/readerReducer";

const reducers = combineReducers({
    manga: mangaReducer,
    navBar: navBarReducer,
    menu: menuReducer,
    searchBar: searchBarReducer,
    reader: readerReducer,
    geral: geralReducer
})

export default createStore(reducers);