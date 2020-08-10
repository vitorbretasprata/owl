import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, InteractionManager } from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import { getProfessors } from "../../../services/Lecture/action";
import { getInfoAccount } from "../../../services/Account/action";
import SearchHeader from "../components/header";
import TeacherBlock from "../components/teacherBlock";

const Dados = [1, 2, 3 , 4]

const { width } = Dimensions.get("screen");

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Aula marcada!',
      body: 'O professor aceitou sua solicitacao para de agendamento de aula!',
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

function Home({ getProfessors, professors, loading, data, getInfoAccount, navigation }) {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [notification, setNotification] = useState({});

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if(data.extraInfo === {}) {
                getInfoAccount();
            }

            if(!expoPushToken) {
                registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
            }

            setLoadingData(false);
        });
    }, []);

    const handleNot = notification => {
        setNotification(notification);
    }

    const handleRes = response => {
    }

    const renderEmptyList = () => <Text>Lista está vazia!</Text>

    const renderFooter = () => {
        if(professors.length !== 0) {
            return <Text>Não há mais professores</Text>;
        }

        return null;
    }

    const extractor = (item, index) => index.toString();

    const sendNotification = async () => {
        await sendPushNotification(expoPushToken);
    }

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
            {!loadingData && (
                <>
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
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
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

//() => navigation.navigate("TeacherProfile", { teacherId: index })

export default connect(MapStateToProps, { getProfessors, getInfoAccount })(Home);