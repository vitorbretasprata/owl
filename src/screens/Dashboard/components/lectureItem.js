import React, { memo } from 'react';
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "galio-framework";
import { BaseButton } from "react-native-gesture-handler";

export default memo(({ chooseLecture, condition, item }) => {
    
    const Choose = () => chooseLecture(item);

    return (
        <>
            <View style={styles.space}>
                <Text style={styles.lecture}>{item}</Text>
                <BaseButton
                    onPress={Choose}
                    style={{ padding: 10 }}
                >
                    <Icon 
                        name="arrow-up-left"
                        family="Feather"
                        color="#707070"
                        size={22}
                    />
                </BaseButton>
            </View>
            {!condition && <View style={styles.dividor}/>}
        </>
    );
})

const styles = StyleSheet.create({
    space: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    lecture: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 16
    },
    dividor: {
        height: 1,
        backgroundColor: "#d3d3d3",
        marginVertical: 5
    }
})