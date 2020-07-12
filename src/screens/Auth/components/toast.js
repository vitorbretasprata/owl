import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";

export default memo(({ ErrorMessage, removeError }) => {

    const updateError = () => removeError();

    return (
        <Toast 
            isShow={true} 
            positionIndicator="bottom" 
            round
            style={styles.toast} 
            textStyle={styles.text}
            positionOffset={250} 
        >    
            <View style={styles.align}>
                <Text>
                    Ocorreu um error no servidor
                </Text>
                <TouchableWithoutFeedback>
                    <Text style={styles.text}>X</Text>
                </TouchableWithoutFeedback>
            </View>           
        </Toast>
    );
});

const styles = StyleSheet.create({
    toast: {
        backgroundColor: "#000"
    },
    text: {
        
    },
    align: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});