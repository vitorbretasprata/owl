import React, { memo } from "react";
import { Block, Text, Icon } from "galio-framework";
import { StyleSheet, View } from "react-native";

import ProfilePicture from "./profilePicture";

const lectures= ["Matemática", "Português", "Biologia", "Física", "Química", "Educação Física"]

export default memo(() => (
    <>
        <Block 
            fluid 
            row
            height={120}
            space="between"
        >
            <Block center>
                <ProfilePicture />
            </Block>
            <Block flex>
                <View style={styles.space}>
                    <Block row>
                        <View style={styles.wrap}>
                            <Text h5 style={styles.title}>
                                Vitor Bretas Prata
                            </Text>
                        </View>                    
                        <Block row flex center height={25}>
                            <Icon 
                                family="Entypo"
                                name="star"
                                color="#F58738"
                                size={20}
                            />
                            <Text style={styles.space}>
                                4.5
                            </Text>
                        </Block>
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
                                50 mins
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
                                R$ 40,00
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
                                R$ 4,00
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