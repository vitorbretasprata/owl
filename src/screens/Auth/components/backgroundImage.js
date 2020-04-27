import React, { memo, useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { Keyboard } from "react-native";
import Animated from "react-native-reanimated";

const { 
    Value,
    Clock,
    cond,
    clockRunning,
    set,
    eq,
    timing,
    startClock,
    stopClock,
    interpolate,
    Extrapolate
} = Animated;

function BackgroundImage() {

    const [offSetY] = useState(new Value(0));
    const [scale] = useState(new Value(1));
    const clock = new Clock();

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", keyBoardDidShow);
        keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", keyBoardDidHide);

    }, []);

    const keyBoardDidShow = () => {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0),
        };
        
        const config = {
            duration: 400,
            toValue: new Value(1),
            easing: Easing.inOut(Easing.ease),
        };
        
        return block([
            cond(
                clockRunning(clock),
                [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
                ],
                [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
                ]
            ),
            // we run the step here that is going to update position
            timing(clock, state, config),
            // if the animation is over we stop the clock
            cond(state.finished, debug('stop clock', stopClock(clock))),
            // we made the block return the updated position
            interpolate(offSetY, {
                inputRange: [0, 1],
                outputRange: [0, -200],
                extrapolate: Extrapolate.CLAMP
            }),
            interpolate(scale, {
                inputRange: [0, 1],
                outputRange: [1, 0.8],
                extrapolate: Extrapolate.CLAMP
            })
        ]);
    }

    const keyBoardDidHide = () => {
        const state = {
            finished: new Value(0),
            position: new Value(1),
            time: new Value(0),
            frameTime: new Value(0),
        };
        
        const config = {
            duration: 400,
            toValue: new Value(0),
            easing: Easing.inOut(Easing.ease),
        };
        
        return block([
            cond(
                clockRunning(clock),
                [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
                ],
                [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
                ]
            ),
            // we run the step here that is going to update position
            timing(clock, state, config),
            // if the animation is over we stop the clock
            cond(state.finished, debug('stop clock', stopClock(clock))),
            // we made the block return the updated position
            interpolate(offSetY, {
                inputRange: [1, 0],
                outputRange: [-200, 0],
                extrapolate: Extrapolate.CLAMP
            }),
            interpolate(scale, {
                inputRange: [1, 0],
                outputRange: [0.8, 1],
                extrapolate: Extrapolate.CLAMP
            })
        ]);
    }

    return (
        <>
            <Animated.Image 
                style={[styles.bgImage, { 
                    transform: [ 
                        { translateY: offSetY },
                    ]
                }]}
                source={require("../assets/img/bgImg/png")}
            />
            <Animated.Image 
                style={[styles.logo, {
                    transform: [
                        { scale: scale },
                        { translateY: offSetY }
                    ]
                }]}
            />
        </>
    );
}

export default memo(BackgroundImage);