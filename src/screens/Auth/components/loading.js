import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

function Loading(props) {    

    if(props.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>   
        );
    }

    return null;    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        zIndex: 1000
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state
    }
}

export default connect(mapStateToProps, null)(Loading);