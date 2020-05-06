import React, { memo, useEffect } from "react";
import { Keyboard, StyleSheet, Platform, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

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
            outputRange: [-90, -180],
            extrapolate: Extrapolate.CLAMP
        })
    ]);
}

const Screen = Dimensions.get("window").width;

function BackgroundImage() {

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
        <>
            <Animated.Image 
                style={[styles.bgImage, { transform: [ { translateY: offSetY }]}]}
                source={require("../assets/img/bgImg.png")}
                resizeMode="contain"
            />
            
        </>
    );  
}

const styles = StyleSheet.create({
    logo: {

    },
    bgImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        left: 0
    }
})

export default memo(BackgroundImage);


/*
    <Animated.Image 
        style={[styles.logo, {
            transform: [
                { scale: scale },
                { translateY: offSetY }
            ]
        }]}
    />
*/