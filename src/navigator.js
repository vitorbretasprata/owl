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

import Lecture from "./screens/Dashboard/Calendario/lecture";

import TeacherProfile from "./screens/Dashboard/Home/teacher";
import TeacherCalendar from "./screens/Dashboard/Home/calendar";
import TeacherCalendarDay from "./screens/Dashboard/Home/day";

import TabBottom from "./components/bottomTabNavigator";
import Configuration from "./screens/Dashboard/Configuration/index";

import { navigationRef } from "./services/navigation/RootNavigate";

const tabOptions = {
    headerShown: false
}

const headerStyle = {
    headerTitle: 'Configurações',
    headerStyle: {
        backgroundColor: '#F58738',
    },
    headerTintColor: '#fff'
}

const headerLectureStyle = {
    headerTitle: 'Aula',
    headerStyle: {
        backgroundColor: '#F58738',
    },
    headerTintColor: '#fff'
}

const Stack = createStackNavigator();
function StackNavigator({ status }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Preload" component={PreLoad} options={{ headerShown: false }} />
            {status ? (
                    <>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="TabBottom" component={TabBottom} options={{...tabOptions}} />
                        <Stack.Screen name="Lecture" component={Lecture} options={{...headerLectureStyle}} />
                        <Stack.Screen name="Configuration" component={Configuration} options={{...headerStyle}} />
                        <Stack.Screen name="ConfigParent" component={ConfigParent} options={{ headerShown: false }} />
                        <Stack.Screen name="ConfigTeacher" component={ConfigTeacher} options={{ headerShown: false }} />
                        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
                        <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ headerShown: false }} />
                        <Stack.Screen name="TeacherCalendar" component={TeacherCalendar} options={{ headerShown: false }} />
                        <Stack.Screen name="TeacherCalendarDay" component={TeacherCalendarDay} options={{ headerShown: false }} />

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