import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";

import { getProfessors } from "../../../services/Lecture/action";

function Calendario({ getProfessors, professors, loading }) {

    

    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    }
});

const MapStateToProps = state => {
    return {
        professors: state.lecture.professors,
        loading: state.lecture.loading
    }
}

export default connect(MapStateToProps, { getProfessors })(Calendario);