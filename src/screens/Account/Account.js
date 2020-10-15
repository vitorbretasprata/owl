import React, { memo, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "galio-framework";
import AsyncStorage from '@react-native-community/async-storage';

import Background from "./components/background";
import Loading from "../../components/loading";

import AuthContext from '../../context/authContext';

import { setAccountInfoAPI } from '../../services/Api/AccountApi';
import { displayFlashMessage } from "../../components/displayFlashMessage";

export default memo(({ navigation }) => {
    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const handleSetAccount = async (type) => {

        setLoading(true);
        const token = await AsyncStorage.getItem("@user:token");
        setAccountInfoAPI(token, type)
            .then(res => {
                authContext.setType(type);
            })
            .catch(error => {
                setLoading(false);
                displayFlashMessage("danger", "Error", error);
            });

    }

    return (
        <Background>
            <Loading loading={loading} />

            <View style={styles.container}>
                <Text style={[styles.textColor, styles.textTitle]}>Bem Vindo</Text>
                <Text style={[styles.textColor, styles.textDesc]}>
                    Antes de começarmos, precisamos 
                    que você configure sua conta.
                </Text>
                <Text style={[styles.textColor, styles.textDesc]}>
                    Selecione o tipo de conta que deseja criar:
                </Text>

                <View style={styles.margin}>
                    <Button 
                        color="#F58738"
                        round 
                        uppercase
                        style={styles.button}
                        onPress={() => handleSetAccount(1)}
                    >
                        Aluno
                    </Button>

                    <Button 
                        color="#F58738"
                        round 
                        uppercase
                        style={styles.button}
                        onPress={() => navigation.navigate("ConfigTeacher")}
                    >
                        Professor
                    </Button>
                </View>
            </View>
        </Background>
    );
});

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center",
       zIndex: 0
   },
   textColor: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10
   },
   textTitle: {
        fontSize: 35
   },
   textDesc: {
        fontSize: 15
   },
   button: {
       marginVertical: 10
   },
   margin: {
       marginTop: 40
   }
});