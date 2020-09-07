import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import PreLoad from "./screens/preload";
import SignIn from "./screens/Auth/signin/index";
import SignUp from "./screens/Auth/signup/index";
import Forgot from "./screens/Auth/reset/index";

import { navigationRef } from "./services/navigation/RootNavigate";
import AppNavigator from "./components/appNavigator";

const Stack = createStackNavigator();
function StackNavigator({ status }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Preload" component={PreLoad} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
                <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }}/>
                {status &&  <AppNavigator />}
        </Stack.Navigator>        
    );
}

function Navigators() {

    return (        
        <NavigationContainer ref={navigationRef}>
            <StackNavigator />
        </NavigationContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, null)(Navigators);