import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, InteractionManager } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { RectButton } from "react-native-gesture-handler";
import HeaderSvg from "../components/headerSvg";
import { logOut } from "../../../services/Auth/action";

const { width, height } = Dimensions.get("screen");

function Profile({ navigation, name, type, logOut }) {
    const [loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setLoadingScreen(false);
        })
    }, [])


    const navigateToConfig = () => {
        navigation.navigate("Configuration");
    }

    const handleLogOut = async () => {
        logOut();
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSvg />
            {!loadingScreen && (
                <View style={styles.userContainer}>
                    <View style={styles.useInfo}>
                        <Text style={{...styles.spacing, ...styles.userName }}>
                            {name || "Visitante"}
                        </Text>
                        <Text style={{...styles.spacing, ...styles.userRole }}>
                            {type === 3 ? "Professor" : "Estudante"}
                        </Text>
                    </View>
                    <View>
                        {type === 3 && (
                            <RectButton
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
                            </RectButton>
                        )}
                        <RectButton
                            style={styles.btn}
                            onPress={handleLogOut}
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
                        </RectButton>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        marginTop: height * 0.35,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    useInfo: {
        marginBottom: 20
    },
    roundSquare: {
        position: "absolute",
        top: height * 0.3,
        paddingTop: 20,
        backgroundColor: "#fff",
        width: width - 100,
        borderRadius: 20,
        elevation: 3
    },
    spacing: {
        color: "#707070",
        textAlign: "center"
    },
    userName: {
        fontSize: 28,
        color: "#F58738",
        paddingVertical: 10
    },
    userRole: {
        fontSize: 16,
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
        loading: state.lecture.loading,
        type: state.account.type,
        name: state.account.name
    }
}

export default connect(MapStateToProps, { logOut })(Profile);