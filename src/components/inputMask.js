import React, { memo } from "react";
import { TextInputMask } from 'react-native-masked-text'
import { StyleSheet } from "react-native";

export default memo(({ updateMasterState, name, currentValue, maskOptions, placeholder, typeMask }) => {
    
    const update = (currentValue) => {
        updateMasterState(name, currentValue);
    }   
    
    return (
        <TextInputMask 
            type={typeMask}
            style={styles.input}
            onChangeText={update}
            value={currentValue}
            placeholder={placeholder}
            options={maskOptions}
            placeholderTextColor="#707070"
        />
    );
});

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 25,
        backgroundColor: "#fff"
    }
});