import React, { memo } from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

function Submit(props) {

    const { onSubmit, title } = props;
  
    return (
        <LinearGradient
            colors={["#F58738", "#F8B586"]}
            start={[0.5, 0.7]}
            style={[styles.submit, { elevation: 3 }]}
            
        >
            <TouchableHighlight
                onPress={onSubmit}                
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableHighlight>
        </LinearGradient>        
    );
};

// Coloring below is used just to easily see the different components
const styles = StyleSheet.create({
    submit: {
        width: "100%",
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -45
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        letterSpacing: 2,
        fontSize: 14,
        textTransform: "uppercase"
    }
});

export default memo(Submit);