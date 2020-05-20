import React, { memo } from 'react';
import { View, StyleSheet } from "react-native";
import { Icon, Button } from "galio-framework";
import { connect } from "react-redux";

function ProfilePicture(props) {

    const selectImage = () => {

    }
    return (
        <View style={styles.container}>
            <Icon 
                name="user"
                family="EvilIcons"
                color="#fff"
                size={290}
            />
            <Button
                onlyIcon 
                icon="camera" 
                iconFamily="antdesign" 
                iconSize={30} 
                color="#F58738" 
                iconColor="#fff" 
                style={styles.buttonCamera}
                onPress={selectImage}
            />  

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCamera: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 250,
        right: 40
    }
});

export default connect(null, null)(ProfilePicture);