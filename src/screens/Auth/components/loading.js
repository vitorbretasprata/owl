import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { connect } from "react-redux";

const ScreenWidth = Dimensions.get("screen").width;

function Loading(props) {  
    
    return props.loading ? 
    (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    ) : 
    <></>;      
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: ScreenWidth,
        height: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7,
        zIndex: 1000
    }
});

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, null)(Loading);