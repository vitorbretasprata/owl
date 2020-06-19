import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default Check = memo((props) => {

    const handleChange = (event) => {
        if(props.updateAll) {
            props.updateAll(event);
        } else {
            props.updateCheck(props.position);
        }
    }

    return (
        <View style={styles.check}>
            <CheckBox
                value={props.initValue}
                onValueChange={handleChange}            
            />
            <TouchableWithoutFeedback onPress={handleChange}>
                <Text style={styles.label}>{props.label}</Text>

            </TouchableWithoutFeedback>
        </View>
    );
});

const styles = StyleSheet.create({
    check: {
        flexDirection: "row"
    },    
    label: {
        paddingLeft: 5,
        paddingVertical: 3,
        fontSize: 15
    }
});

Check.propTypes = {
    label: PropTypes.string.isRequired,
    position: PropTypes.number,
    updateCheck: PropTypes.func,
    updateAll: PropTypes.func
}

//