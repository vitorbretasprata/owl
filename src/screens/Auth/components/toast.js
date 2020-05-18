import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "galio-framework";

function ToastHandler(props) {

    const { ErrorMessage } = props;

    return (
        <Toast 
            isShow={ErrorMessage ? true : false} 
            positionIndicator="bottom" 
            round
            style={styles.toast} 
            textStyle={styles.text}
            
        >
            <View style={styles.align}>
                <Text>
                    {ErrorMessage ? ErrorMessage : ""}
                </Text>
                <TouchableOpacity>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
           
        </Toast>
    );
}

const styles = StyleSheet.create({
    toast: {
        backgroundColor: "#db1616",

    },
    text: {
        
    },
    align: {

    }
})

export default memo(ToastHandler);