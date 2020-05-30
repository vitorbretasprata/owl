import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";


function Home(props) {

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: "100%"
    },
    align: {    
        paddingHorizontal: 30,
    },  
    other: {
        paddingHorizontal: 30,
        alignItems: "center"
    },
    touchable: {
        width: 50,
        height: 50,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 5
    },
    goBack: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginVertical: 20
    },
    Logo: {
        fontSize: 50,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 50    
    }
});

export default connect(null, null)(Home);