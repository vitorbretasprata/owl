import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  Dimensions
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

import Loading from "../../../components/loading";
import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Submit from "../components/submit";
import Or from "../components/or";
import Social from "../components/social";

import { Login } from "../../../services/Auth/action";

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

const { height } = Dimensions.get("screen");

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

function SignIn({ navigation, Login, loading }) {

  const [values, setValues] = useState({
      email: "",
      password: ""
  });
  
  const isEnabled = values["password"].length > 0 && values["email"].length > 0;

  const _handleChange = (attrName, value) => {
      setValues({
          ...values,
          [attrName]: value
      });
  }  

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

  const _handleLogin = () => Login(values);

  return (
    <BackgroundImage>
      <Loading loading={loading} />
      <View style={styles.container}>
        <View>
        <Animated.Text 
              style={[styles.Logo, {
                transform: [
                  { scale: interpolate(valueKey, {
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                    extrapolate: Extrapolate.CLAMP
                  })}
                ]
              }]}
            >
                Logo
        </Animated.Text>
          
        <Animated.View style={[styles.align, 
        { 
          transform: [ 
            { translateY: 
                interpolate(valueKey, {
                  inputRange: [0, 1],
                  outputRange: [0, -60],
                  extrapolate: Extrapolate.CLAMP
                }) 
            }]}
        ]}>
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

          <TouchableOpacity style={styles.forgotPasswordArea} onPress={() => navigation.navigate("Forgot")}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <Submit 
            title="Entrar" 
            onSubmit={_handleLogin} 
            isDisabled={!isEnabled}
          />
              
        </Animated.View>
        </View>
        

        <View style={styles.other}>

          <Or />

          <Social />
        </View>   
      </View>
    </BackgroundImage>    
  );
};

// Coloring below is used just to easily see the different components
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: height - 100,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  align: {    
    paddingHorizontal: 15,
    marginTop: 0
  },
  forgotPasswordArea: { 
    width: "100%", 
    paddingHorizontal: 15 
  },
  forgotPassword: { 
    color: "#0071c5", 
    textAlign: "right"
  },
  other: {
    paddingHorizontal: 15,
  
  },  
  Logo: {
    fontSize: 50,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 50    
  }
});

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, { Login })(SignIn);