import React, { memo } from 'react';
import { View, StyleSheet } from "react-native";
import { Icon } from "galio-framework";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

function ProfilePicture({ gestureHandler }) {

    return ( 
        <View style={styles.container}>
            
            <View style={styles.buttonCamera}>
                <TapGestureHandler {...gestureHandler}>
                    <Animated.View>
                        <Icon 
                            name="camera"
                            family="antdesign"
                            color="#fff"
                            size={30}
                        />
                    </Animated.View>
                </TapGestureHandler>
            </View>                            
        </View>            
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCamera: {
        width: 50,
        height: 50,
        
        
        backgroundColor: "#F58738",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
    },    
});

export default memo(ProfilePicture);