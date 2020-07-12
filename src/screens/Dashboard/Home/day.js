import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager } from "react-native";
import { Text } from "galio-framework";
import { ScrollView, BaseButton } from "react-native-gesture-handler";

import { yearsName } from "../../constants/index";
import HeaderSvg from "../components/headerSvg";

const { width } = Dimensions.get("screen");

export default({ route: { params }}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(null)


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
            <View style={styles.teacherAction}>
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
    
});