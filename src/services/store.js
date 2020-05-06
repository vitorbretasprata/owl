import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';


import AuthReducer from "./Auth/reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'auth',
    ],
    blacklist: [
    ],
};

const reducers = combineReducers({
    auth: AuthReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

let persistor = persistStore(store);

export { store, persistor };