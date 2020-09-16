import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from "redux-logger";

import AuthReducer from "./Auth/reducer";
import AccountReducer from "./Account/reducer";
import LectureReducer from "./Lecture/reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'auth',
    ],
    blacklist: [
      'account',
      'lecture'
    ],
};

const reducers = combineReducers({
    account: AccountReducer,
    lecture: LectureReducer
});

const logger = createLogger();

//const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(reducers, applyMiddleware(ReduxThunk, logger));

let persistor = persistStore(store);

export { store, persistor };