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
        height: 30,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 5
    },
    absoluteFill: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})

export default memo(ProgressBar);