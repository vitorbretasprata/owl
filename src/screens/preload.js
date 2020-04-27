import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { checkLogin } from "../services/Auth/action";

function PreLoad(props) {

    useEffect(() => props.checkLogin(), []);

    return (
        <View style={styles.container}>
            <Text>Carregando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center"
   } 
});


const mapStateToProps = (state) => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, { checkLogin })(PreLoad);