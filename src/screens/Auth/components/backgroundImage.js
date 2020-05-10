import React, { memo } from "react";
import { StyleSheet, ImageBackground } from "react-native";

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
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default memo(BackgroundImage);