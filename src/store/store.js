import { createStore, combineReducers } from "redux";

import mangaReducer from "./reducers/mangaReducer";

const reducers = combineReducers({
    manga: mangaReducer
})

export default createStore(reducers);