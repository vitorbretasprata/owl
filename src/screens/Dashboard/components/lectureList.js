import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, FlatList, Text } from "react-native";

import { Lectures } from "../constants/constants";
import LectureItem from "../components/lectureItem";

const { height, width } = Dimensions.get("screen");
const statusBarHeight = StatusBar.currentHeight;

export default memo(({ chooseLecture, item, choose, filter }) => {

    const data = Lectures.filter(lecture => lecture.includes(filter));

    const extractor = (item, i) => i.toString();

    const renderLecture = ({ item, index }) => <Text>1</Text>

    const chooseFilter = () => {
        console.log(item)
        chooseLecture(item);
    }

    return (
        <View style={styles.listContainer}>
            
        </View>
    );
})

const styles = StyleSheet.create({
    space: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    lecture: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 16
    },
    divisor: {
        height: 1,
        backgroundColor: "#d3d3d3",
        marginVertical: 5
    },
    listContainer: {
        position: "absolute",
        zIndex: 100,
        backgroundColor: "#fff",
        top: statusBarHeight + 50,
        left: 0,
        width,
        height
    }
})