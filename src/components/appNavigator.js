import React, { memo, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

import Lecture from "../screens/Dashboard/Calendario/lecture";

import TeacherProfile from "../screens/Dashboard/Home/teacher";
import TeacherCalendar from "../screens/Dashboard/Home/calendar";

import TabBottom from "./bottomTabNavigator";
import Configuration from "../screens/Dashboard/Configuration/index";

import { registerToken } from "../services/Api/AccountApi";
import { displayFlashMessage } from "./displayFlashMessage";

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

        Notifications.addNotificationReceivedListener(notification => {
            console.log(notification)
        });

        Notifications.addNotificationResponseReceivedListener(notification => {
            console.log(notification)
        });
    }, []);

    const registerForPushNotifications = async () => {

        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if(!permission.granted) return;

            const token = await Notifications.getExpoPushTokenAsync();
            const authToken = await AsyncStorage.getItem("@user:token");

            registerToken(token.data, authToken).then(res => {

            }).catch(error => {
                displayFlashMessage("danger", "Error", error);
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="TabBottom" component={TabBottom} options={{...tabOptions}} />
            <Stack.Screen name="Lecture" component={Lecture} options={{...headerLectureStyle}} />
            <Stack.Screen name="Configuration" component={Configuration} options={{...headerStyle}} />
            <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ headerShown: false }} />
            <Stack.Screen name="TeacherCalendar" component={TeacherCalendar} options={{ ...headerCalendarStyle }} />
        </Stack.Navigator>
    );
})