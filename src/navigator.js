import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import PreLoad from "./screens/preload";
import SignIn from "./screens/Auth/signin/index";
import SignUp from "./screens/Auth/signup/index";
import Reset from "./screens/Auth/reset/index";

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
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
                        <Stack.Screen name="Reset" component={Reset} options={{ headerShown: false }}/>
                    </>
                )
            }
        </Stack.Navigator>        
    );
}



function Navigators() {

    return (        
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, {})(Navigators);