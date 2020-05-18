import React, { memo } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";

const Screen = Dimensions.get("screen");

function BackgroundImage(props) {
    return (
        <ImageBackground
            source={require("../assets/img/Background.png")}
            style={styles.bg}
        >
            {props.children}
        </ImageBackground>
    );  
}

const styles = StyleSheet.create({
    bg: {
        resizeMode: "cover",
        paddingVertical: 25,
        paddingHorizontal: 15,
        width: Screen.width,
        height: Screen.height
    }
})

export default memo(BackgroundImage);