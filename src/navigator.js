import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import PreLoad from "./screens/preload";
import SignIn from "./screens/Auth/signin/index";
import SignUp from "./screens/Auth/signup/index";
import Forgot from "./screens/Auth/reset/index";

import Account from "./screens/Account/Account";
import ConfigParent from "./screens/Account/Parent/config";
import ConfigTeacher from "./screens/Account/Teacher/config";

import { navigationRef } from "./services/navigation/RootNavigate";

const Stack = createStackNavigator();
function StackNavigator(props) {

    const { status } = props;

    return (
        <Stack.Navigator>
            <Stack.Screen name="Preload" component={PreLoad} options={{ headerShown: false }} />
            {status ? (
                    <>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="ConfigParent" component={ConfigParent} options={{ headerShown: false }} />
                        <Stack.Screen name="ConfigTeacher" component={ConfigTeacher} options={{ headerShown: false }} />

                        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
                        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }}/>
                    </>
                )
            }
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