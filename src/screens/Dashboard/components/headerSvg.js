import React, { memo } from "react";
import { StyleSheet, Dimensions, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("screen");

export default memo(({ image }) => {
    return (
        <>
            <Svg width="100%" height="100%" viewBox="0 0 50 50">
                <Path
                    d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z" // put your path here
                    fill="blue"
                    stroke="black"
                /> 
            </Svg>
            <Text>adasdsa</Text> 
        </>        
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }    
});