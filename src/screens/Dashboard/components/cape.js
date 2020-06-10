import React, { memo } from "react";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import { LienarGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("screen");
export default function Cape({ profilePic }) {
    return (
        <LienarGradient
            colors={["#F58738", "#F8B586"]}
            start={[0.5, 0.7]}
            style={styles.container}
        >
            {profilePic && (
                <ImageBackground 
                    source={profilePic}
                />
            )}
        </LienarGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height - 300, 
        borderWidth: 1,
        borderColor: "#000",
    }
});