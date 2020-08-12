import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default memo(({ lecture, index, showLectureModal, length, keyCell}) => {

  const showModal = () => {
    showLectureModal(lecture, index);
  }

  console.log(lecture, index, length)

  return (
      <TouchableWithoutFeedback
          style={styles.lecture}
          onPress={showModal}
          key={keyCell}
      >
          <Text style={[styles.lectureText]}>
              {lecture} - ({length})
          </Text>
      </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
    lecture: {
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    lectureText: {
        textAlign: "center",
        marginVertical: 10,
        color: "#707070"
    }
});