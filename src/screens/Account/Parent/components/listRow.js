import React, { memo, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Transitioning, Transition } from 'react-native-reanimated';

function ListRow(props) {
    const { onRemove, name } = props; 
    const animRef = useRef();

    const [show, setShow] = useState(true);
    
    const transition = (
        <Transition.Sequence>
          <Transition.Out type="scale" />
          <Transition.Change interpolation="easeInOut" />
          <Transition.In type="fade" />
        </Transition.Sequence>
    );

    const HandleRemove = () => {    
        if (onRemove) {
            animRef.current.animateNextTransition();
            setShow(false);
            onRemove();
        }
    };    

    return (
        <Transitioning.View 
            ref={animRef}
            transition={transition}
        >
            {show && (
                <View style={styles.align}>
                    <Text style={styles.childName}>{name}</Text>
                    
                    <TouchableWithoutFeedback
                        onPress={HandleRemove}
                    >
                        <Icon 
                            name="trash" 
                            family="entypo" 
                            color="#fff" 
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                </View>
            )}            
        </Transitioning.View>
    );
}


const styles = StyleSheet.create({
    align: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 2,
        paddingVertical: 10
    },
    childName: {
        fontSize: 18,
        color: "#fff"
    }
});

export default memo(ListRow);