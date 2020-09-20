import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import LectureComponents from "./components/lecturesComponents";
import { getInfoAccount } from "../../../services/Account/action";

function Configuration({ type, extraInfo, getInfoAccount }) {

    useEffect(() => {
        if(extraInfo === {}) {
            getInfo();
        }
    }, []);

    const getInfo = async () => {
        const token = await AsyncStorage.getItem("@user:token");
        getInfoAccount(token, type);

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                {type === 3 && <LectureComponents />}
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
        type: state.account.type,
        loading: state.account.loading,
        extraInfo: state.account.extraInfo
    }
}

export default connect(MapStateToProps, { getInfoAccount })(Configuration);