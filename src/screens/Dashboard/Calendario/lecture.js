import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, InteractionManager } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage"
import { BaseButton } from "react-native-gesture-handler";

import Modal from "./components/modalLecture";
import { removeLecture } from "../../../services/Account/action";

function Lecture({ route, removeLecture, navigation }) {

    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({});
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if(route.params) {
                setParams(route.params);
            } else {
                setError("Informações da aula não encontrado, tente novamente mais tarde.");
            }

            setLoading(false);
        });

        return () => {
            setParams("")
        }
    }, []);

    const rmLecture = async () => {
        const token = await AsyncStorage.getItem("@token:user");

        removeLecture(params.item.id, token);
        navigation.goBack();
    }

    const close = () => setShow(false);
    const open = () => setShow(true);

    if(loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }   

    if(error) {
        <SafeAreaView style={styles.container}>
            <Text>{error}</Text>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={styles.container}>            
            <Modal 
                showModal={show}
                deleteSelected={rmLecture}
                closeModal={close}
            />
            <Text style={styles.name}>{params.item.nome}</Text>
            <View style={styles.subContainer}>
                <View>
                    <Text style={{...styles.dataInfo, marginBottom: 15 }}>Matéria: Não definida</Text>
                    <Text style={styles.dataInfo}>Horário: {params.item.horarioInicio}</Text>
                </View>
                <View>
                    <Text style={{...styles.dataInfo, marginBottom: 15 }}>Local: {params.item.local}</Text>
                    <Text style={styles.dataInfo}>Valor total: R${params.item.valor}</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <BaseButton 
                    style={styles.btn}
                    onPress={open}
                >
                    <Text style={{ color: "#fff", fontSize: 18 }}>Cancelar Aula</Text>
                </BaseButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 30,
        alignItems: "center"
    },
    subContainer: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    name: {
        color: "#F58738",
        fontSize: 33,
        marginBottom: 10
    },
    dataInfo: {
        marginBottom: 15,
        fontSize: 15,
        color: "#707070"
    },
    buttons: {
        marginTop: 20
    },
    btn: {
        height: 40,
        backgroundColor: "#F58738",
        padding: 6,
        paddingHorizontal: 15,
        borderRadius: 10
    }
});

export default connect(null, { removeLecture })(Lecture);