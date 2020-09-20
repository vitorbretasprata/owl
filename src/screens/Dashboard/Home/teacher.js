import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager, Linking } from "react-native";
import { Text, Icon } from "galio-framework";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { yearsName } from "../../constants/index";
import HeaderSvg from "../components/headerSvg";
import { fetchProfessorAPI } from "../../../services/Api/lecturesApi";
import { displayFlashMessage } from "../../../components/displayFlashMessage";

const { width, height } = Dimensions.get("screen");

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
        fetchProfessorAPI(id).then(teacher => {
            let teacherLectures = {};
            teacher.lectures.forEach(lecture => {
                teacherLectures[lecture.name] = (!teacherLectures[lecture.name]) ? [lecture.yearCode] : [...teacherLectures[lecture.name], lecture.yearCode]
            });

            let teacherInfo = {
                id: teacher.id,
                lecture_time: teacher.lecture_time,
                lecture_value: teacher.lecture_value,
                movement_value: teacher.movement_value,
                complete_name: teacher.complete_name,
                phone: teacher.phone,
                lectures: teacherLectures
            }

            setInfo(teacherInfo);
            setIsLoading(false);
        }).catch(error => {
            displayFlashMessage("danger", "Error", "Não foi possível pegar as informações do professor, retornando a lista...");
            navigation.back();
        });
    }  

    const handleCalendar = () => {
        navigation.navigate("TeacherCalendar", { teacherInfo: info });
    }

    const handlePhone = () => {
        Linking.canOpenURL("whatsapp://send?text=Olá")
            .then(supported => {
                if(supported) {
                    return Linking.openURL(`whatsapp://send?phone=${info.phone}&text=Olá`);
                } else {
                    return Linking.openURL(`https://api.whatsapp.com/send?phone=${info.phone}&text=Olá`);
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
            <HeaderSvg navigation={navigation} needNavigation={true} />
            <View style={{ ...styles.spaceBetween, ...styles.teacherAction }}>

                <TouchableWithoutFeedback onPress={handlePhone}>
                    <View style={{ ...styles.actionButton, ...styles.buttonWhatsapp }}>
                        <Icon 
                            name="whatsapp" 
                            family="MaterialCommunityIcons" 
                            color="#fff" 
                            size={40} 
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleCalendar}>
                    <View style={{ ...styles.actionButton, ...styles.buttonSchedule }}>
                        <Icon 
                            name="schedule" 
                            family="MaterialIcons" 
                            color="#fff" 
                            size={40} 
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.teacherContainer}>
                {info && (
                    <>
                        <View style={{...styles.spaceBetween, ...styles.teacherInfo}}> 
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
                            {info.complete_name}
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
    actionButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e3e3e3",
        marginBottom: 26
    },
    buttonSchedule: {
        backgroundColor: "#F58738"
    },
    buttonWhatsapp: {
        backgroundColor: "#25D366"
    },
    spaceBetween: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    teacherAction: {
        marginTop: height * 0.15,
        paddingHorizontal: width * 0.15,
        flexDirection: "row",
        alignItems: "center"
    },
    teacherContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff"
    },
    teacherInfo: {
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
        height: 1,
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