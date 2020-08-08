import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager, Linking } from "react-native";
import { Text, Icon } from "galio-framework";
import { ScrollView, BaseButton, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { yearsName } from "../../constants/index";
import HeaderSvg from "../components/headerSvg";

const { width } = Dimensions.get("screen");

export default({ route: { params }, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(null);


    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            getTeacher(params.teacherId);
        });
    }, []);

    const getTeacher = (id) => {
        const teacher = {
            name: "Felipe Santos",
            totalClasses: 340,
            avaliacoes: 122,
            contacts: 12,
            local: "Brasília - DF, Brasil",
            lectures: {
                "Matemática": [3, 6, 4],
                "Gramática": [3, 6, 4],
                "Física": [3, 6, 4]
            }
        }

        setInfo(teacher);
        setIsLoading(false);
    }  

    const handleCalendar = () => {
        navigation.navigate("TeacherCalendar");
    }

    const handlePhone = () => {
        Linking.canOpenURL("whatsapp://send?text=teste")
            .then(supported => {
                if(supported) {
                    return Linking.openURL("whatsapp://send?phone=5561981242660&text=teste");
                } else {
                    return Linking.openURL("https://api.whatsapp.com/send?phone=5561981242660&text=teste");
                }
            });
    }

    if(isLoading) {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }

    if(error) {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}> 
            <HeaderSvg />
            <View style={styles.teacherAction}>
                
                <TouchableWithoutFeedback onPress={handlePhone}>
                    <View style={styles.logoWhatsapp}>
                        <Icon 
                            name="whatsapp" 
                            family="MaterialCommunityIcons" 
                            color="#fff" 
                            size={40} 
                        />
                    </View>
                </TouchableWithoutFeedback>
                <BaseButton onPress={handleCalendar} style={styles.actionButton}>
                    <Text style={styles.buttonText}>
                        Agendar Aula
                    </Text>
                </BaseButton>
            </View>          
            <View style={styles.teacherContainer}>
                {info && (
                    <>
                        <View style={styles.teacherInfo}> 
                            <View style={styles.teacherNumber}>
                                <Text style={styles.number}>
                                    {info.totalClasses}
                                </Text>
                                <Text style={styles.text}>
                                    Aulas
                                </Text>
                            </View>

                            <View style={styles.teacherNumber}>
                                <Text style={styles.number}>
                                    {info.avaliacoes}
                                </Text>
                                <Text style={styles.text}>
                                    Avaliações
                                </Text>
                            </View>

                            <View style={styles.teacherNumber}>
                                <Text style={styles.number}>
                                    {info.contacts}
                                </Text>
                                <Text style={styles.text}>
                                    Contatos
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.divisor}/>                
                        
                        <Text style={styles.teacherName}>
                            {info.name}
                        </Text>

                        <Text style={styles.teacherLocation}>
                            {info.local}
                        </Text>

                        <Text style={styles.lectures}>
                            Matérias
                        </Text>

                        <View style={styles.lecturesList}> 
                            {Object.keys(info.lectures).map(lecture => {
                                return (
                                    <View key={lecture} style={styles.lectureContainer}>
                                        <Text style={styles.lectureName}>{lecture}</Text>
                                        {info.lectures[lecture].map(year => (
                                            <Text style={styles.year} key={year.toString()}>
                                                {yearsName[year]}
                                            </Text>
                                        ))}
                                    </View>
                                )
                            })}
                        </View>
                    </>
                )}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    logoWhatsapp: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#25D366",
        justifyContent: "center",
        alignItems: "center"
    },
    teacherAction: {
        justifyContent: "center",
        alignItems: "center"
    },
    teacherContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    actionButton: {
        padding: 10,
        backgroundColor: "#F58738",
        borderRadius: 3,
        marginVertical: 10
    },
    buttonText: {
        color: "#fff"
    },
    teacherInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 140
    },
    teacherNumber: {
        justifyContent: "center",
        alignItems: "center"
    },
    number: {
        fontSize: 22,
        color: "#F58738"
    },
    text: {
        fontSize: 10,
        color: "#c0c0c0"
    },
    teacherLocation: {
        fontSize: 14,
        color: "#c0c0c0",
        marginBottom: 40
    },
    divisor: {
        height: 2,
        width: width - 120,
        marginVertical: 10,
        backgroundColor: "#707070"
    },
    teacherName: {
        fontSize: 28,
        color: "#F58738",
        paddingVertical: 10
    },
    lectures: {
        fontSize: 26,
        color: "#F58738",
        paddingVertical: 0
    },
    lectureContainer: {
        marginTop: 10,
        paddingBottom: 10
    },
    lectureName: {
        paddingVertical: 10,
        fontSize: 18,
        color: "#707070",
        textAlign: "center",
        fontWeight: "bold"
    },
    year: {
        paddingVertical: 2,
        fontSize: 16
    }
});