import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default memo(({ lecture, index, showLectureModal, length, keyCell}) => {

  const showModal = () => {
    showLectureModal(lecture, index);
  }

  return (
      <TouchableWithoutFeedback
          style={styles.lecture}
          onPress={showModal}
          key={keyCell}
      >
          <Text style={[styles.lectureText, { color: length > 0 ? "#F58738"  : "#707070" }]}>
              {lecture}
          </Text>
      </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
    lecture: {
        paddingHorizontal: 45,
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    lectureText: {
        textAlign: "center",
        marginVertical: 10
    }
});