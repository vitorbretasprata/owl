import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager } from "react-native";
import { Text } from "galio-framework";
import HeaderSvg from "../components/headerSvg";

const { width } = Dimensions.get("screen");

export default({ route: { params }}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(true);


    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            getTeacher(params.teacherId);
        });
    }, []);

    const getTeacher = (id) => {
        setIsLoading(false);
    }  

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
            <HeaderSvg />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1        
    }    
});