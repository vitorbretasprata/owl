import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Text,
  ScrollView
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Loading from "../components/loading";
import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Submit from "../components/submit";

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
          set(state.position, 0),
          set(state.frameTime, 0),
          set(config.toValue, 1),
          startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished,stopClock(clock)),
      interpolate(state.position, {
          inputRange: [0, 1],
          outputRange: [0, -20],
          extrapolate: Extrapolate.CLAMP
      })
  ]);
}

const Screen = Dimensions.get("screen")
const scrollWidth = Screen.width - 80;

export default function SignUp() {

    const navigation = useNavigation();
    const scrollRef = useRef(null);

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

    const clock = new Clock();
    const hasKeyBoardShown = new Value(-1);
    let index = 1;

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

    const handleScroll = () => {
        if(scrollRef.current && scrollRef.current.scrollTo) {
            index++;
            scrollRef.current.scrollTo({
                animated: true,
                x: scrollWidth * index,
                y: 0
            });
        }
    }

    const offSetY = RunTiming(clock, hasKeyBoardShown);
    const logoScale = 1;

    return (
        <BackgroundImage>
            <Loading />
            <SafeAreaView style={styles.container}>
                <Animated.Text 
                style={[styles.Logo, {
                    transform: [
                        { scale: logoScale }
                    ]
                }]}
                >
                    Logo
                </Animated.Text>
                
                <Animated.View style={[styles.align, { transform: [ { translateY: offSetY }]}]}>
                    <ScrollView
                        horizontal
                        scrollEnabled={false}
                        pagingEnabled
                        ref={scrollRef}
                        style={styles.scroll}
                    >
                        <View style={styles.page}>
                            <Text style={styles.alignText}>
                                Informe endereço de email que você cadastrou, 
                                será enviado um código para a alteração de senha.
                            </Text>
                            <AuthInput 
                                placeholder="Email"
                                attrName="email"
                                value={values["email"]}
                                updateMasterState={_handleChange}
                                icon="mail"
                                family="AntDesign"
                            />
                        </View>

                        <View style={styles.page}>
                            <Text style={styles.alignText}>
                                Informe o código
                            </Text>
                            <AuthInput 
                                placeholder="Código"
                                attrName="code"
                                value={values["code"]}
                                updateMasterState={_handleChange}
                                icon="mail"
                                family="AntDesign"
                            />
                        </View>

                        <View style={styles.page}>
                            <Text style={styles.alignText}>
                                Digite uma nova senha
                            </Text>
                            <AuthInput 
                                placeholder="Senha"
                                attrName="password"
                                value={values["password"]}
                                updateMasterState={_handleChange}
                                icon="lock"
                                family="AntDesign"
                            />

                            <AuthInput 
                                placeholder="Confirmar senha"
                                attrName="confirm"
                                value={values["confirm"]}
                                updateMasterState={_handleChange}
                                icon="lock"
                                family="AntDesign"
                            />
                        </View>
                        
                    </ScrollView>                   
                               
                </Animated.View>

                <View style={styles.other}>
                    <Submit 
                        title="Enviar"
                        onSubmit={handleScroll}
                    />

                    <LinearGradient
                        colors={["#F58738", "#F8B586"]}
                        start={[0.5, 0.7]}
                        style={[styles.goBack, { elevation: 3 }]}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => navigation.goBack()} 
                            style={styles.touchable}               
                        >
                            <Icon name="left" family="AntDesign" color={theme.COLORS.WHITE} size={35} />
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                </View>          
            </SafeAreaView>
        </BackgroundImage>        
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Screen.height - 50,
    width: Screen.width - 20,
    borderRadius: 10,
    justifyContent: "space-around"
  },
  align: {    
    paddingHorizontal: 30,
  },  
  other: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  touchable: {
    width: 50,
    height: 50,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5
  },
  scroll: {
    width: scrollWidth,    
  },
  page: {
    width: scrollWidth,
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
  },
  alignText: {
      textAlign: "center",
      marginBottom: 20
  }
});