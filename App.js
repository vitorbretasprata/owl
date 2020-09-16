import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import FlashMessage from "react-native-flash-message";

import Navigator from "./src/navigator";
import { store } from "./src/services/store";

enableScreens();


export default function App() {
  return (
    <Provider store={store}>
        <Navigator />
      <FlashMessage position="top" /> 
    </Provider>
  );
}