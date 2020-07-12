import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import { getProfessors } from "../../../services/Lecture/action";
import SearchHeader from "../components/header";
import TeacherBlock from "../components/teacherBlock";

const Dados = [1, 2, 3 , 4]

const { width } = Dimensions.get("screen");

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldSetBadge: true,
        shouldPlaySound: true,
        shouldShowAlert: true
    })
});

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {

      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

    } else {

      alert('Must use physical device for Push Notifications');

    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

    }
  
    return token;
}

function Home({ getProfessors, professors, loading, data, navigation }) {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [tokenNotification, setTokenNotification] = useState("");

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if(status != 'granted')
                alert("");

            let location = await Location.getCurrentPositionAsync({});
            mountFilter(location);
        })();

    }, []);

    const mountFilter = location => {

        const filter = {
            location
        }

        getProfessors(filter);
    }

    const renderEmptyList = () => <Text>Lista está vazia!</Text>

    const renderFooter = () => {
        if(professors.length !== 0) {
            return <Text>Não há mais professores</Text>;
        }

        return null;
    }

    const extractor = (item, index) => index.toString();


    const renderProfessor = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("TeacherProfile", { teacherId: index })}>
                <TeacherBlock />
                {!(index === (Dados.length - 1)) && <View style={styles.dividor}/>}
            </TouchableWithoutFeedback>
        );
    }

    const renderMore = () => {}

    const refresh = () => {}

    return (
        <SafeAreaView style={styles.container}>
            <SearchHeader />
            <FlatList 
                contentContainerStyle={styles.list}
                data={Dados}
                renderItem={renderProfessor}
                keyExtractor={extractor}
                ListEmptyComponent={renderEmptyList}
                ListFooterComponent={renderFooter}
                onEndReached={renderMore}
                onRefresh={refresh}
                refreshing={isRefreshing}                
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderWidth: 1,
        paddingBottom: 75
    },
    list: {
        flexGrow: 1,
        width,
        paddingHorizontal: 5,
    },
    dividor: {
        height: 1,
        backgroundColor: "#e3e3e3",
        marginVertical: 15
    } 
});

const MapStateToProps = state => {
    return {
        professors: state.lecture.professors,
        loading: state.lecture.loading,
        data: state.account
    }
}

export default connect(MapStateToProps, { getProfessors })(Home);