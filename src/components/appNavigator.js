import React, { memo, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "./screens/Account/Account";
import ConfigParent from "./screens/Account/Parent/config";
import ConfigTeacher from "./screens/Account/Teacher/config";

import * as Notifications from "expo-notifications";
import Permissions from "expo-permissions";

import Lecture from "./screens/Dashboard/Calendario/lecture";

import TeacherProfile from "./screens/Dashboard/Home/teacher";
import TeacherCalendar from "./screens/Dashboard/Home/calendar";

import TabBottom from "./components/bottomTabNavigator";
import Configuration from "./screens/Dashboard/Configuration/index";

import AccountApi from "../services/Api/AccountApi";
import AsyncStorage from "@react-native-community/async-storage";


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

const headerCalendarStyle = {
    headerTitle: 'Agendar Aula',
    headerStyle: {
        backgroundColor: '#F58738',
    },
    headerTintColor: '#fff'
}

const Stack = createStackNavigator();
export default memo(() => {

    useEffect(() => {
        registerForPushNotifications();

        Notifications.addListener(notification => {
            console.log(notification);
        });
    }, []);

    const registerForPushNotifications = async () => {

        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if(!permission.granted) return;

            const token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            const authToken = await AsyncStorage.getItem("user:token");

            AccountApi.registerToken(token, authToken);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="TabBottom" component={TabBottom} options={{...tabOptions}} />
            <Stack.Screen name="Lecture" component={Lecture} options={{...headerLectureStyle}} />
            <Stack.Screen name="Configuration" component={Configuration} options={{...headerStyle}} />
            <Stack.Screen name="ConfigParent" component={ConfigParent} options={{ headerShown: false }} />
            <Stack.Screen name="ConfigTeacher" component={ConfigTeacher} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ headerShown: false }} />
            <Stack.Screen name="TeacherCalendar" component={TeacherCalendar} options={{ ...headerCalendarStyle }} />
        </Stack.Navigator>
    );
})