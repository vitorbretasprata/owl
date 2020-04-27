import React, { memo } from "react";
import { TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AuthInput(props) {
    const { title } = props;

    return (
        <>
            <Ionicons icon="md-mail"/>
            <View>
            <Text>{title}</Text>
                <TextInput />
            </View>
            
        </>
    );
}

export default memo(AuthInput);