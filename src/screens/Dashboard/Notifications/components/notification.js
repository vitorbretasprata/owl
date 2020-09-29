import React, { memo, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { Icon } from "galio-framework";

const { width } = Dimensions.get("screen");

export default memo(({ message, cls, date }) => (
    <View style={styles.block}>
        <View style={styles.message}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{cls}</Text>
            </View>
            <View style={styles.message}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
        </View>
    </View>
));

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20
    },
    titleText: {
        fontSize: 20
    },
    message: {
        flex: 1
    },
    messageText: {

    },
    lecture: {
        color: "#fff",
        backgroundColor: "#F58738",
        padding: 7,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 10
    },
    title: {
        color: "#F58738",
        paddingVertical: 12,
        paddingRight: 15
    },
    space: {
        paddingLeft: 10,
    }
})