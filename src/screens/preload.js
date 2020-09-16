import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";

import { Preloader } from "../services/Auth/action";

function PreLoad({ Preloader }) {

    useEffect(() => {
        _checkLogin();
    }, []);

    const _checkLogin = async () => {
        const token = await AsyncStorage.getItem("user:token");
        Preloader(token);
    }

    return (
        <View style={styles.container}>
            <Text>Carregando</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center"
   } 
});

const mapStateToProps = state => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, { Preloader })(PreLoad);