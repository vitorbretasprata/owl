import React, { memo, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { Icon } from "galio-framework";

const { width } = Dimensions.get("screen");

export default memo(({ message, cls, date }) => (
    <View style={styles.block}>
        <View style={styles.icon}>
            <Icon 
                name="book" 
                family="AntDesign" 
                color="#000" 
                size={10}
            />
        </View>
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
        width: "100%"
    },   
    wrap: {
        flexWrap: "wrap"
    },
    titleText: {

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