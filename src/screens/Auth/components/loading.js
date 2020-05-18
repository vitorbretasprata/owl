import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

function Loading(props) {  
    
    return props.loading ? 
    (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    ) : 
    <>
    </>;      
    
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
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, null)(Loading);