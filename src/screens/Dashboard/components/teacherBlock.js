import React, { memo } from "react";
import { Block, Text, Icon } from "galio-framework";
import { StyleSheet, View } from "react-native";

import ProfilePicture from "./profilePicture";

const lectures= ["Matemática", "Português", "Biologia", "Física", "Química", "Educação Física"]

export default memo(({ professor }) => (
    <>
        <Block 
            fluid 
            row
            height={120}
            space="between"
        >
            <Block center>
                <ProfilePicture height={80} width={80} />
            </Block>
            <Block flex>
                <View style={styles.space}>
                    <Block row>
                        <View style={styles.wrap}>
                            <Text h5 style={styles.title}>
                                {professor.complete_name}
                            </Text>
                        </View>
                    </Block>
                    <Block row>
                        <Block row flex center>
                            <Icon 
                                family="Entypo"
                                name="graduation-cap"
                                color="#000"
                                size={20}
                            />
                            <Text style={styles.space}>
                                {professor.lecture_time} mins
                            </Text>
                        </Block>

                    </Block>
                    <Block row>
                        <Block row flex center>
                            <Icon 
                                family="MaterialIcons"
                                name="local-library"
                                color="#000"
                                size={20}
                            />
                            <Text style={styles.space}>
                                R$ {professor.lecture_value}
                            </Text>
                        </Block>
                        <Block row flex center height={25}>
                            <Icon 
                                family="MaterialIcons"
                                name="location-on"
                                color="#000"
                                size={20}
                            />
                            <Text style={styles.space}>
                                R$ {professor.movement_value}
                            </Text>
                        </Block>
                    </Block>

                </View>
            </Block>
        </Block>
        <View style={[styles.wrap, styles.lectures]}>
            {lectures.map((x, i) => <Text key={i} style={styles.lecture}>{x}</Text>)}          
        </View>
    </>    
));

const styles = StyleSheet.create({
    image: {
        
    },
    lectures: {
        flexDirection: "row",
    },
    wrap: {
        flexWrap: "wrap"
    },
    lecture: {
        color: "#fff",
        backgroundColor: "#F58738",
        padding: 7,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 10
    },
    title: {
        color: "#F58738",
        paddingVertical: 12,
        paddingRight: 15
    },
    space: {
        paddingLeft: 10,
    }
})