import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";

import CustomDay from "./components/customDay";

const { width } = Dimensions.get("screen");

function TeacherCalendar({ days }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            loadCalendar();
        });
    }, []);

    const loadCalendar = (id) => {
        
        setIsLoading(false);
    }  

    const handleCalendar = () => {

    }

    const renderCustomDay = props => <CustomDay {...props} days={days} />;

    if(isLoading) {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }

    if(error) {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }

    return (
        <View style={styles.container}> 
            <Calendar 
                dayComponent={renderCustomDay}
                headerStyle={{ borderColor: "#000", borderWidth: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#000"
    }    
});

const mapStateToProps = state => {
    return {
        days: state.account.extraInfo.days
    }
}

export default connect(mapStateToProps, null)(TeacherCalendar);