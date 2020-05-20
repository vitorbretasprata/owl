import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

function Sequence() {
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="scale" />
      <Transition.Change interpolation="easeInOut" />
      <Transition.In type="fade" />
    </Transition.Sequence>
  );

  let [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);
  const ref = useRef();

  const popArr = () => {
        arr.pop();
  }

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.centerAll}>
      <Button
        title="show or hide"
        color="#FF5252"
        onPress={() => {
          ref.current.animateNextTransition();
          popArr();
        }}
      />
      {arr.map((x, i) => (
            <Text style={styles.text} key={i}>
                {x}
            </Text>
      ))}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  centerAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});

export default Sequence;