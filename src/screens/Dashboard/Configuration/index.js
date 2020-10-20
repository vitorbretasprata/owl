import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import LectureComponents from "./components/lecturesComponents";
import { getInfoAccount } from "../../../services/Account/action";
import AuthContext from "../../../context/authContext";


function Configuration({ extraInfo, getInfoAccount }) {
    const authContext = useContext(AuthContext);

    const [loadingScreen, setLoadingScreen] = useState(true)

    useEffect(() => {
        getInfo();

        setTimeout(() => {
            setLoadingScreen(false);
        }, 4000);

    }, []);

    const getInfo = async () => {
        const token = await AsyncStorage.getItem("@user:token");
        getInfoAccount(token, authContext.type);
    }

    if(loadingScreen) {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.section}>
                    Carregando...
                </Text>
            </ScrollView>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                {authContext.type === 3 && <LectureComponents />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        paddingTop: 10,
        paddingBottom: 25
    },
    options: {
        paddingTop: 10
    },
    option: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    optionText: {
        color: "#707070",
        fontSize: 18,
        marginLeft: 10
    },
    sectionTitle: {
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 20,
        color: "#707070"
    },
    separator: {
        height: 1,
        backgroundColor: "#e3e3e3"
    }
});

const MapStateToProps = state => {
    return {
        loading: state.account.loading,
        extraInfo: state.account.extraInfo
    }
}

export default connect(MapStateToProps, { getInfoAccount })(Configuration);