import React, { memo } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export default memo(({ children }) => (
    <ImageBackground
        source={require("../assets/img/Background.png")}
        style={styles.bg}
    >
        {children}
    </ImageBackground>
));

const styles = StyleSheet.create({
    bg: {
        resizeMode: "cover",
        paddingVertical: 25,
        paddingHorizontal: 15,
        width,
        height
    }
});