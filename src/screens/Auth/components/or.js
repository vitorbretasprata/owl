import React, { memo } from "react";
import {
  Text,
  StyleSheet,
  View
} from "react-native";

function Or() { 

  return (
    <View style={styles.or}>
      <View style={styles.line}></View>
      <View style={styles.circle}>
        <Text style={styles.text}>OU</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    or: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
      paddingHorizontal: 45,
      marginVertical: 20
    },
    line: {
        width: 50,
        height: 2,
        backgroundColor: "#404040"
    },
    circle: {
        height: 38,
        width: 38,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#404040"
    },
    text: {
      fontSize: 10,
      color: "#404040"
    }
});

export default memo(Or);