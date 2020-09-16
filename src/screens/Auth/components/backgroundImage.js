import React, { memo } from "react";
import { StyleSheet, ImageBackground, Dimensions, StatusBar } from "react-native";

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
        paddingTop: StatusBar.currentHeight + 10,
        paddingBottom: 10,
        paddingHorizontal: 15,
        width,
        height
    }
});