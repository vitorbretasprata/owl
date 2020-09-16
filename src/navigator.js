import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import SignIn from "./screens/Auth/signin/index";
import SignUp from "./screens/Auth/signup/index";
import Forgot from "./screens/Auth/reset/index";

import { navigationRef } from "./services/navigation/RootNavigate";
import AppNavigator from "./components/appNavigator";
import AuthContext from './context/authContext';

const Stack = createStackNavigator();

function AuthNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

function Navigators() {
    const [token, setToken] = useState("");

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <NavigationContainer ref={navigationRef}>
                {!token ? <AuthNavigator /> : <AppNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default Navigators;