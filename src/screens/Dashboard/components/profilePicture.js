import React, { memo } from "react";
import { View, Image, StyleSheet } from "react-native";
import DefaultProfilePic from "../../assets/teacher_profile.png";

export default memo(({ image }) => (
    <View style={styles.picture}>
        <Image 
            source={image ? image : DefaultProfilePic}
            width={80}
            height={80}
        />
    </View>
));

const styles = StyleSheet.create({
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    }
});