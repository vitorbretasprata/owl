import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import PreLoad from "./screens/preload";
import SignIn from "./screens/Auth/signin/index";
import SignUp from "./screens/Auth/signup/index";

const Stack = createStackNavigator();
function StackNavigator(props) {


    const { status } = props;

    if(status === 2) {
        return <PreLoad />;
    }



    return (
        <Stack.Navigator>
            {status ? (
                    <>
            
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignIn}/>
                        <Stack.Screen name="SignUp" component={SignUp}/>
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