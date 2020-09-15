import { createStore, combineReducers } from "redux";

import searchBarReducer from "./reducers/searchBarReducer";
import mangaReducer from "./reducers/mangaReducer";
import navBarReducer from "./reducers/navBarReducer";

const reducers = combineReducers({
    manga: mangaReducer,
    navBar: navBarReducer,
    searchBar: searchBarReducer
})

export default createStore(reducers);