import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, FlatList, Text } from "react-native";

import { Lectures } from "../constants/constants";
import LectureItem from "../components/lectureItem";

const { height, width } = Dimensions.get("screen");
const statusBarHeight = StatusBar.currentHeight;

export default memo(({ chooseLecture, item, choose, filter }) => {

    const data = Lectures.filter(lecture => lecture.includes(filter));

    const extractor = (item, i) => i.toString();
    const renderLecture = ({ item, index }) => <LectureItem item={item} chooseLecture={chooseFilter}/>
    const renderSeparator = () => <View style={styles.divisor}/>;

    const chooseFilter = (item) => {
        console.log("item: ", item)
        chooseLecture(item);
    }

    const renderFooter = () => <View style={styles.footer}/>;

    return (
        <View style={styles.listContainer}>
            <FlatList 
                data={data}
                keyExtractor={extractor}
                ItemSeparatorComponent={renderSeparator}
                renderItem={renderLecture}
                style={{ flex: 1 }}
                contentContainerStyle={{ zIndex: 100 }}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
})

const styles = StyleSheet.create({
    space: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    divisor: {
        height: 1,
        backgroundColor: "#d3d3d3",
        marginVertical: 5
    },
    listContainer: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: "#fff",
        top: statusBarHeight + 50,
        left: 0,
        width,
        height
    },
    footer: {
        height: 50,
        marginBottom: 30
    }
})