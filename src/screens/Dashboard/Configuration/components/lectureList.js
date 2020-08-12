import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default memo(({ arrayLength, itemName, handleClickModal, keyCell }) => {

    const showModal = () => {
        handleClickModal(itemName);
    }

    return (
        <TouchableWithoutFeedback
            style={styles.lecture}
            onPress={showModal}
            key={keyCell}
        >
            <Text style={[styles.lectureText]}>
                {itemName} - ({arrayLength})
            </Text>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    lecture: {
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    lectureText: {
        textAlign: "center",
        marginVertical: 10,
        color: "#707070"
    }
});