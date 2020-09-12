import { createStore, combineReducers } from "redux";

import mangaReducer from "./reducers/mangaReducer";
import navBarReducer from "./reducers/navBarReducer";

const reducers = combineReducers({
    manga: mangaReducer,
    navBar: navBarReducer
})

export default createStore(reducers);