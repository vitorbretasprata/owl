import React, { memo } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import DefaultProfilePic from "../../assets/teacher_profile.png";

export default memo(({ image }) => 
    <ImageBackground 
        source={image ? image : DefaultProfilePic} 
        style={styles.picture} 
    />
);

const styles = StyleSheet.create({
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10
    }
});