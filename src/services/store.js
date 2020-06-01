import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';

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
    auth: AuthReducer,
    account: AccountReducer,
    lecture: LectureReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

let persistor = persistStore(store);

export { store, persistor };