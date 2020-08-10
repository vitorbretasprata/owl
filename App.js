import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import FlashMessage from "react-native-flash-message";
import * as Notifications from "expo-notifications";

import Navigator from "./src/navigator";
import { persistor, store } from "./src/services/store";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async (res) => {
      return {
          shouldSetBadge: true,
          shouldPlaySound: true,
          shouldShowAlert: true
      }      
  }
});

export default function App() {
  useEffect(() => {
    
    Notifications.addNotificationReceivedListener(notification => console.log("dfsjhdsakljfasdgfklsdfds", notification));
    Notifications.addNotificationResponseReceivedListener(res => console.log("dfsjhdsakljfasdgfklsdfds", res));
    return () => {
      Notifications.removeAllNotificationListeners();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
      <FlashMessage position="top" /> 
    </Provider>
  );
}