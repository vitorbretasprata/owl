import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import TeacherBlock from "../components/teacherBlock";


const { width } = Dimensions.get("screen");

function Notifications({ loading }) {

    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {

        
    }, []);    

    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connect(null, null)(Notifications);