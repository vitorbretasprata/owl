import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default memo(({ index, showDependentOptions, dependent }) => {
    const handleTouch = (index) => {
        showDependentOptions(index);
    }

    return (
        <RectButton
            style={styles.dependentButton}
            onPress={handleTouch}
            key={index}
        >
            <Text style={styles.dependentText}>
                {dependent}
            </Text>
        </RectButton>
    );
});

const styles = StyleSheet.create({
    dependentButton: {
        height: 70,
        width: "100%",
        paddingHorizontal: 50
    },
    dependentText: {
        paddingLeft: 10,
        fontSize: 18,
        color: "#707070"
    },
})