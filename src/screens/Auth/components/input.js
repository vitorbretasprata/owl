import React, { memo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Input, theme } from "galio-framework";
import PropTypes  from "prop-types";

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
                style={{ borderColor: theme.COLORS.WARNING }}
                onChangeText={_handleChangeText}
                placeholderTextColor={theme.COLORS.WARNING}
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