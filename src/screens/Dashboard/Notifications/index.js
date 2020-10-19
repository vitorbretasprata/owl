import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, StatusBar } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage"
import { Icon, Text } from "galio-framework";

import NotificationBlock from "./components/notification";
import { fetchNotificationAPI } from "../../../services/Api/AccountApi";
import { displayFlashMessage } from "../../../components/displayFlashMessage";

const { width } = Dimensions.get("screen");

function Notifications({ loading }) {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotification();
    }, []);

    const getNotification = async () => {
        const token = await AsyncStorage.getItem("@user:token");
        fetchNotificationAPI(page, token)
            .then(res => {
                setLimit(res.limit);
                if(res.data.length > 0 && notifications.length === 0) {
                    setNotifications(res);
                } else {
                    setNotifications([...notifications, ...res.data]);
                }
                setIsRefreshing(false);
        })
        .catch(error => {
            displayFlashMessage("danger", "Error", error);
            setIsRefreshing(false);
        });
    }

    const refreshList = () => {
        setIsRefreshing(true);

        setNotifications([]);
        getNotification();
    }

    const getMoreNotification = async () => {
        if((page + 1) < limit) {
            setPage(page + 1);
            getNotification();
        }
    }

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Icon 
                name="bell"
                family="EvilIcons"
                size={50}
                color="#707070"
            />
            <Text style={styles.emptyText}>Nenhuma notificação encontrada!</Text>
        </View>
    );

    const renderSeparator = () => <View style={styles.divisor} />

    const extractor = (item) => item.id.toString();

    const renderNotification = ({ item }) => <NotificationBlock message={item.message}/>;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                contentContainerStyle={styles.list}
                onRefresh={refreshList}
                data={notifications}
                keyExtractor={extractor}
                onEndReached={getMoreNotification}
                refreshing={isRefreshing}
                renderItem={renderNotification}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmpty}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        flexGrow: 1,
        width,
        paddingHorizontal: 5,
    },
    divisor: {
        height: 1,
        backgroundColor: "#e3e3e3",
        marginVertical: 15
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    emptyText: {
        color: "#707070",
        fontSize: 18,
        marginVertical: 5
    }
});

export default connect(null, null)(Notifications);