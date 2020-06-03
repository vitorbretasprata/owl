import React, { useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import { Preloader } from "../services/Auth/action";

function PreLoad({ Preloader, status, navigation }) {

    useEffect(() => {
        _checkLogin();
    }, []);    

    useEffect(() => {
        if(status === 0) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: "SignIn" }
                    ]
                })
            );            
        }
    }, [status]); 

    const _checkLogin = async () => {
        const token = await AsyncStorage.getItem("user:token");
        Preloader(token);        
    }    

    return (
        <View style={styles.container}>
            <Text>Loading</Text>            
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