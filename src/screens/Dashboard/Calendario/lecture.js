import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, InteractionManager } from "react-native";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Icon } from "galio-framework";

function Lecture() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setLoading(false);
        });        
    }, []);

    if(loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }   

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


export default connect(null, null)(Lecture);