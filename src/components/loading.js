import React, { memo } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default memo(({ loading }) => {
    if(loading) {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: width,
        height: height,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7,
        zIndex: 1000
    }
});