import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

import Loading from "../components/loading";
import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Submit from "../components/submit";
import Or from "../components/or";
import Social from "../components/social";
import Toast from "../components/toast";

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

function SignIn(props) {

  const { navigation, Login, error } = props;
  const [values, setValues] = useState({
      email: "",
      password: ""
  });
  const isEnabled = values["password"].length > 0 && values["email"].length > 0;
  const hasKeyBoardShown = new Value(-1);
  const clock = new Clock();

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

  const offSetY = RunTiming(clock, hasKeyBoardShown);
  const logoScale = 1;

  const _handleLogin = () => {
      Login(values);
  }

  return (
    <BackgroundImage>
      <Loading />
      <View style={styles.container}>
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

            <View style={styles.other}>

              <Or />

              <Social />
            </View>   
            <Toast ErrorMessage={error}/>
      </View>
    </BackgroundImage>    
  );
};

// Coloring below is used just to easily see the different components
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10
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
    paddingHorizontal: 15
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
      error: state.auth.error
    }
}

export default connect(mapStateToProps, { Login })(SignIn);