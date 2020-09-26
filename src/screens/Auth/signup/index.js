import React, { useState, useEffect, memo } from "react";
import {
  View,
  StyleSheet,
  Keyboard
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

import Loading from "../../../components/loading";
import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Submit from "../components/submit";
import { requestRegister } from "../../../services/Api/AuthApi";

const { 
  Value,
  Clock,
  cond,
  set,
  timing,
  startClock,
  stopClock,
  interpolate,
  Extrapolate,
  block,
  neq,
  eq,
  and
} = Animated;

const clock = new Clock();
const hasKeyBoardShown = new Value(-1);

const RunTiming = (clock, hasKeyBoardShown) => {
  const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
  };
  
  const config = {
      duration: 300,
      toValue: new Value(-1),
      easing: Easing.inOut(Easing.ease),
  };
  
  return block([
      cond(and(eq(hasKeyBoardShown, 1), neq(config.toValue, 1)), [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, 0),
          set(state.frameTime, 0),
          set(config.toValue, 1),
          startClock(clock),
      ]),
      cond(and(eq(hasKeyBoardShown, 0), neq(config.toValue, 0)), [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, 1),
          set(state.frameTime, 0),
          set(config.toValue, 0),
          startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished,stopClock(clock)),
      state.position
  ]);
}

const valueKey = RunTiming(clock, hasKeyBoardShown);

export default memo(({ navigation }) => {
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        repeat: ""
    });

    const _handleChange = (attrName, value) => {
        setValues({
            ...values,
            [attrName]: value
        });
    }

    const isEnabled = values["name"].length > 0 && 
                    values["email"].length > 0 && 
                    values["password"].length > 0 && 
                    values["repeat"].length > 0;
    
    useEffect(() => {
        const valKeyboard = Platform.select({ ios: "Will", android: "Did" });
        const showEventName = `keyboard${valKeyboard}Show`;
        const hideEventName = `keyboard${valKeyboard}Hide`;

        Keyboard.addListener(showEventName, handleKbdShow);
        Keyboard.addListener(hideEventName, handleKbdHide);
        return () => {
            Keyboard.removeListener(showEventName, handleKbdShow);
            Keyboard.removeListener(hideEventName, handleKbdHide);
        }
    }, []); 

    const handleKbdShow = () => {
        hasKeyBoardShown.setValue(1);
    }

    const handleKbdHide = () => {
        hasKeyBoardShown.setValue(0);
    }

    const _handleRegister = async () => {
        setLoadingScreen(true);
        requestRegister(values)
            .then(data => {
                displayFlashMessage("success", "Cadastro", "Cadastro realizado com sucesso.");
                navigation.navigate("SignIn");
            })
            .catch(error => {
                setLoadingScreen(false);
                displayFlashMessage("danger", "Error", error);
            });
    }

    const back = () => {
        navigation.goBack();
    }

    return (
        <BackgroundImage>
            <Loading loading={loadingScreen} />
            <View style={styles.container}>
                <View>
                    <Animated.Text 
                        style={[styles.Logo, {
                            transform: [
                                { scale: interpolate(valueKey, {
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.6],
                                    extrapolate: Extrapolate.CLAMP
                                })},
                                { translateY: interpolate(valueKey, {
                                    inputRange: [0, 1],
                                    outputRange: [0, -10],
                                    extrapolate: Extrapolate.CLAMP
                                })}
                            ]
                        }]}
                    >
                        Logo
                    </Animated.Text>

                    <Animated.View style={
                        [
                            styles.align, { 
                                transform: [ 
                                    { translateY: interpolate(valueKey, {
                                        inputRange: [0, 1],
                                        outputRange: [0, -60],
                                        extrapolate: Extrapolate.CLAMP
                                    })}
                                ]
                            }
                        ]
                    }>
                        <AuthInput 
                            placeholder="Nome completo"
                            attrName="name"
                            value={values["name"]}
                            updateMasterState={_handleChange}
                            icon="user"
                            family="AntDesign"
                        />

                        <AuthInput 
                            placeholder="Email"
                            attrName="email"
                            value={values["email"]}
                            updateMasterState={_handleChange}
                            icon="mail"
                            family="AntDesign"
                        />

                        <AuthInput 
                            placeholder="Senha"
                            attrName="password"
                            value={values["password"]}
                            updateMasterState={_handleChange}
                            icon="lock"
                            family="AntDesign"
                            secureTextEntry={true}
                        />

                        <AuthInput 
                            placeholder="Confirmar senha"
                            attrName="repeat"
                            value={values["repeat"]}
                            updateMasterState={_handleChange}
                            icon="lock"
                            family="AntDesign"
                            secureTextEntry={true}
                        /> 
                        <Submit 
                            title="Cadastrar" 
                            onSubmit={_handleRegister} 
                            isDisabled={!isEnabled}
                        />
                    </Animated.View>

                </View>

                <View style={styles.other}>

                    <LinearGradient
                        colors={["#F58738", "#F8B586"]}
                        start={[0.5, 0.7]}
                        style={[styles.goBack, { elevation: 3 }]}
                    >
                        <TouchableWithoutFeedback
                            onPress={back} 
                            style={styles.touchable}
                        >
                            <Icon name="left" family="AntDesign" color={theme.COLORS.WHITE} size={35} />
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                </View> 
            </View>
        </BackgroundImage>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "space-between",
        paddingVertical: 10
    },
    align: {    
        paddingHorizontal: 30,
    },  
    other: {
        paddingHorizontal: 30,
        alignItems: "center"
    },
    touchable: {
        width: 50,
        height: 50,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 5
    },
    goBack: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginVertical: 20
    },
    Logo: {
        fontSize: 50,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 50    
    }
});