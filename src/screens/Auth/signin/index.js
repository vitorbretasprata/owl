import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  SafeAreaView
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Submit from "../components/submit";
import Or from "../components/or";
import Social from "../components/social";

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
          outputRange: [-80, -120],
          extrapolate: Extrapolate.CLAMP
      })
  ]);
}

export default function SignIn() {

  const [values, setValues] = useState({
      email: "",
      password: ""
  });

  const _handleChange = (attrName, value) => {
      setValues({
          ...values,
          [attrName]: value
      });
  }

  const clock = new Clock();
  const hasKeyBoardShown = new Value(-1);

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

  const offSetY = RunTiming(clock, hasKeyBoardShown);

  return (
    <SafeAreaView style={styles.container}>
        <BackgroundImage />
        
          <Animated.View style={[styles.align, { transform: [ { translateY: offSetY }]}]}>
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
            />

            <TouchableOpacity style={{ width: 290 }}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.other}>
            <Submit title="Entrar"/>

            <Or />

            <Social />
          </View>          
    </SafeAreaView>
  );
};

// Coloring below is used just to easily see the different components
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  align: {    
    paddingHorizontal: 30,
    marginTop: 300
  },
  forgotPassword: { 
    color: "#0071c5", 
    textAlign: "right"
  },
  other: {
    paddingHorizontal: 30
  }
});