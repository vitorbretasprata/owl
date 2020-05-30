import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";


function ProgressBar(props) {

    const { progressWidth } = props;

    return (
        <View style={styles.ProgressBar}>
            <Animated.View style={[styles.absoluteFill, { width: progressWidth }]}></Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    ProgressBar: {
        height: 22,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10,
        width: 200
    },
    absoluteFill: {
        position: "absolute",
        top: 0,
        left: -2,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        borderRadius: 11
    }
})

export default memo(ProgressBar);