import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "galio-framework";

export default memo(({ chooseLecture, item }) => {

    const chooseFilter = () => {
        console.log(item)
        chooseLecture(item);
    }

    return (
        <TouchableOpacity onPress={chooseFilter}>
            <Text style={styles.lecture}>{item}</Text>
        </TouchableOpacity>
    );
})

const styles = StyleSheet.create({
    lecture: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 16
    }
})