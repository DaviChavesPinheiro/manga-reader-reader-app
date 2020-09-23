import { createStore, combineReducers } from "redux";

import searchBarReducer from "./reducers/searchBarReducer";
import mangaReducer from "./reducers/mangaReducer";
import navBarReducer from "./reducers/navBarReducer";
import readerReducer from "./reducers/readerReducer";

const reducers = combineReducers({
    manga: mangaReducer,
    navBar: navBarReducer,
    searchBar: searchBarReducer,
    reader: readerReducer
})

export default createStore(reducers);