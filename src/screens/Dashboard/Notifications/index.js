import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage"

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
        const token = await AsyncStorage.getItem("@token:user");
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

    const renderSeparator = () => <View style={styles.divisor} />

    const extractor = (item) => item.id.toString();

    const renderNotification = ({ item }) => <NotificationBlock message={item.message}/>;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                onRefresh={refreshList}
                data={notifications}
                keyExtractor={extractor}
                onEndReached={getMoreNotification}
                refreshing={isRefreshing}
                renderItem={renderNotification}
                ItemSeparatorComponent={renderSeparator}
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
    divisor: {
        height: 1,
        backgroundColor: "#e3e3e3",
        marginVertical: 15
    }
});

export default connect(null, null)(Notifications);