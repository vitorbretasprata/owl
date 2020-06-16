import React, { memo } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

const { height } = Dimensions.get("screen");
export default memo(({ profilePic }) => (
    <LinearGradient
        colors={["#F58738", "#F8B586"]}
        start={[0.5, 0.7]}
        style={styles.container}
    >
       {profilePic && (
           <Image 
                source={profilePic}
           />
       )}
    </LinearGradient>
));

const styles = StyleSheet.create({
    container: {
        height: height - 400,         
        width: "100%",
        position: "absolute",
        top: 0
    }
});