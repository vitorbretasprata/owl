import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { BaseButton } from "react-native-gesture-handler";

import Cape from "../components/cape";

const { width, height } = Dimensions.get("screen");

function Profile({ navigation }) {

    const navigateToConfig = () => {
        navigation.navigate("Configuration");
    }

    const logOut = () => {
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <Cape />
            <View style={styles.roundSquare}>
                <View style={styles.infoSpace}>
                    <Text style={[styles.spacing, styles.rating]}>
                        <Icon 
                            family="Entypo"
                            name="star"
                            color="#F58738"
                            size={20}
                        />
                        4,5
                    </Text>
                    <Text style={[styles.spacing, styles.name]}>
                        Vitor Bretas Prata
                    </Text>
                    <Text style={[styles.spacing, styles.location]}>
                        MG - Governador Valadares
                    </Text>                    
                </View>
                <BaseButton
                    style={styles.btn}
                    onPress={navigateToConfig}
                >
                    <Icon 
                        family="Entypo"
                        name="cog"
                        size={22}
                        color="#707070"
                    />
                    <Text style={styles.btnText}>
                        Configuração
                    </Text>
                </BaseButton>
                <BaseButton
                    style={styles.btn}
                >
                    <Icon 
                        family="AntDesign"
                        name="logout"
                        size={20}
                        color="#707070"
                    />
                    <Text style={styles.btnText}>
                        Sair
                    </Text>
                </BaseButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    roundSquare: {
        position: "absolute",
        top: 200,
        backgroundColor: "#fff",
        width: width - 100,
        borderRadius: 20,
        elevation: 3
    },
    infoSpace: {

    },
    spacing: {
        color: "#707070",
        textAlign: "center"
    },
    name: {
        fontSize: 20,
        paddingBottom: 5
    },
    rating: {
        fontSize: 18,
        paddingVertical: 10
    },
    location: {
        fontSize: 13,
        paddingBottom: 10
    },
    btn: {
        height: 70,
        width: "100%",
        justifyContent: 'flex-start',
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: "row",
        borderTopColor: "#e3e3e3",
        borderTopWidth: 1
    },
    btnText: {
        paddingLeft: 10,
        fontSize: 18,
        color: "#707070"
    }
});

const MapStateToProps = state => {
    return {        
        loading: state.lecture.loading
    }
}

export default connect(null, null)(Profile);