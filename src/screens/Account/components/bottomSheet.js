import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");

const AnimatedBottomSheet = ({ translateY, gestureHandler, zIndex }) => (
  <>
    <TapGestureHandler {...gestureHandler}>
      <Animated.View
        style={
          [
            StyleSheet.absoluteFill, 
            {
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: zIndex
            }
          ]
        }
      />
    </TapGestureHandler>
    <Animated.View
      style={
        [
          styles.bottomSheet, 
          {
            transform: [{ translateY: translateY }],
            zIndex: 100
          }
        ]
      }
    >
      <Text>AnimatedBottomSheet</Text>
    </Animated.View>
  </>
);
export default AnimatedBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteFill: {
    flex: 1,
    position: "absolute",
    width: width,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: width - 20,
    height: 300,
    backgroundColor: "white",
    borderRadius: 25,
    marginHorizontal: 10,
    alignItems: "center",
  },
});