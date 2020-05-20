import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "galio-framework";
import { connect } from "react-redux";

import Background from "./components/background";
import { SetType } from "../../services/User/action";

function Account(props) {

    const { SetType } = props;

    return (
        <Background>
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
                        onPress={() => SetType(2, "ConfigParent")}
                    >
                        Responsável
                    </Button>

                    <Button 
                        color="#F58738"
                        round 
                        uppercase
                        style={styles.button}
                        onPress={() => SetType(1, "ConfigStudent")}
                    >
                        Aluno
                    </Button>

                    <Button 
                        color="#F58738"
                        round 
                        uppercase
                        style={styles.button}
                        onPress={() => SetType(3, "ConfigTeacher")}
                    >
                        Professor
                    </Button>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center"
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

export default connect(null, { SetType })(Account);