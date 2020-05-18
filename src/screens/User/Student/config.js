import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "galio-framework";
import { connect } from "react-redux";

import Background from "../components/background";
import { SetType } from "../../../services/User/action";

function ConfigStudent(props) {

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

                <View>
                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Responsável
                        </Button>
                    </View>

                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Aluno
                        </Button>
                    </View>

                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Professor
                        </Button>
                    </View>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       borderWidth: 1,
       borderColor: "#000"
   },
   textColor: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10
   },
   textTitle: {
        fontSize: 40
   },
   textDesc: {
        fontSize: 20
   }
});

export default connect(null, { SetType })(ConfigStudent);