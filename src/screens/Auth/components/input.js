import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "galio-framework";
import PropTypes from "prop-types";

AuthInput.propTypes = {
    attrName: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    updateMasterState: PropTypes.func.isRequired,
    keyboardType: PropTypes.string
}

function AuthInput(props) {

    const { value, placeholder, icon, family } = props;

    const _handleChangeText = updatedValue => {
        const { attrName, updateMasterState } = props;
        updateMasterState(attrName, updatedValue);
    }

    return (
        <View style={styles.input}>
            <Input 
                placeholder={placeholder}
                left
                rounded
                icon={icon}
                family={family}
                value={value}
                onChangeText={_handleChangeText}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 0,
        width: "100%"
    }
});

export default memo(AuthInput);