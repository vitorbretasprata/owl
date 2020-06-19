import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default memo(({ arrayLength, itemName, handleClickModal }) => {

    const handleModal = () => {
        handleClickModal(itemName);
    }
    return (
        <TouchableWithoutFeedback
            style={[
                styles.lecture, 
                { 
                    borderColor: arrayLength !== 0 ? "#F58738" : "#fff" 
                }
            ]}
            onPress={handleModal}
        >
            <Text style={{ color: arrayLength !== 0 ? "#F58738" : "#fff" }}>
                {itemName}
            </Text>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    lecture: {
        width: "100%",
        borderWidth: 2,
        justifyContent: "center",
        paddingHorizontal: 15,
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    white: {
        color: "#fff"
    }
});