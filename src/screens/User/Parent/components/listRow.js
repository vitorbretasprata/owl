import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from "galio-framework";
import { Transitioning, Transition } from 'react-native-reanimated';

function ListRow (props) {
    const { onRemove, name } = props; 

    const [show, setShow] = useState(false);
    
    const transition = (
        <Transition.Sequence>
          <Transition.Out type="scale" />
          <Transition.Change interpolation="easeInOut" />
          <Transition.In type="fade" />
        </Transition.Sequence>
    );

    useEffect(() => {
        useState(true);
    }, []);

    const HandleRemove = () => {    
        if (onRemove) {
            setShow(false);
            onRemove();
        }
    };    

    return (
        <Transitioning.View transition={transition}>
            {show && (
                <View style={styles.align}>
                    <Text style={styles.childName}>{name}</Text>
                    <Button 
                        round 
                        iconOnly
                        icon="trash-o"
                        iconFamily="FontAwesome"
                        iconColor="#fff"
                        iconSize={30}
                        style={{ width: 40, height: 40 }}
                        onPress={HandleRemove}
                    ></Button>
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
        paddingVertical: 5
    },
    childName: {
        fontSize: 18,
        color: "#fff"
    }
});

export default memo(ListRow);