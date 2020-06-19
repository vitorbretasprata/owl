import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from 'react-native-masked-text';

import LectureModal from "./modals/lectureModal";
import { setDays, setLectures, setLectureInfo } from "../../../../services/Account/action";
import LectureList from "./lectureList";
import { daysArr } from "../../constants/constants";


function LecturesComponent(
    { 
        lectures, 
        days, 
        setLectures, 
        setDays, 
        setLectureInfo, 
        lectureTime, 
        lectureValue, 
        movementValue 
    }
) {

    const [showModal, setShowModal] = useState(false);
    const [selectedDays, setSelectedDays] = useState([1, 3]);
    const [selectedLecture, setSelectedLecture] = useState("");
    const [lectureArr, setLectureArr] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const [valueLecture, setValueLecture] = useState(lectureValue);
    const [timeLecture, setTimeLecture] = useState(lectureTime);
    const [valueMovement, setValueMovement] = useState(movementValue);

    const handleTimeLecture = text => setTimeLecture(text);
    const handleValueLecture = text => setValueLecture(text);
    const handleValueMovement = text => setValueMovement(text);

    const editMode = () => setShowEdit(true);
    const cancelEdit = () => setShowEdit(false);

    const saveEdit = () => {
        if(valueLecture && timeLecture && valueMovement) {
            setShowEdit(false);
            setLectureInfo(valueLecture, timeLecture, valueMovement)
        }        
    }

    const showLectureModal = lecture => {
        setSelectedLecture(lecture);
        setLectureArr(lectures[lecture]);
        setShowModal(true);
    }

    const updateLectures = (arr, name) => {
        setLectures(arr, name);
    }    

    const close = () => {
        setShowModal(false);
    }

    const handleDays = (item) => {
        if(selectedDays.includes(item)) {
            let aux = selectedDays;
            const index = aux.indexOf(item);
            if (index > -1) {
                aux.splice(index, 1);
                setSelectedDays(aux);
            }
        } else {
            setSelectedDays([...setSelectedDays, item]);
        }
    }

    return (
        <ScrollView style={styles.container}>
                <LectureModal 
                    showModal={showModal}
                    closeModal={close}
                    selectedItem={selectedLecture}
                    selectedItemArr={lectureArr}
                    saveSelectedYears={updateLectures}
                />
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>
                            Dias
                        </Text>
                    </View>

                    {daysArr.map((day, index)=> (
                        <TouchableWithoutFeedback
                            key={index}
                            style={styles.day}
                            onPress={() => handleDays(day)}
                        >
                            <Text style={[
                                styles.dayText, 
                                { 
                                    color: selectedDays.includes(index) 
                                    ? 
                                        "#F58738"  
                                    : 
                                        "#707070" 
                                }
                            ]}>
                                {day}
                            </Text>
                        </TouchableWithoutFeedback>
                    ))}              
                        
                    

                    <View style={styles.separator} />            
                    
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>
                            Matérias Lecionadas
                        </Text>
                    </View>  

                    {
                        Object
                            .keys(lectures)
                            .map((lecture, index) =>              
                                <LectureList 
                                    lecture={lecture} 
                                    index={index} 
                                    showLectureModal={showLectureModal}
                                    length={lectures[lecture].length}
                                    keyCell={index}
                                />)
                    }   

                    <View style={styles.separator} />   
                </View>

                <View style={styles.section}>
                    <View style={[styles.sectionTitle, styles.editButtons]}>
                        <Text style={styles.title}>
                            Valores
                        </Text>
                        <View style={styles.alignIcons}>
                            {!showEdit ? (
                                <TouchableWithoutFeedback
                                    onPress={editMode}
                                >
                                    <Icon 
                                        family="AntDesign"
                                        name="edit"
                                        color="#F58738"
                                        size={25}
                                    />
                                </TouchableWithoutFeedback>                               
                                
                            ) : (
                                <View style={styles.saveIcons}>
                                    <TouchableWithoutFeedback
                                        onPress={cancelEdit}
                                    >
                                        <Icon 
                                            family="AntDesign"
                                            name="close"
                                            color="#F58738"
                                            size={25}
                                        />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={saveEdit}  
                                        style={{ marginLeft: 10 }}                                      
                                    >
                                        <Icon 
                                            family="AntDesign"
                                            name="check"
                                            color="#F58738"
                                            size={25}
                                        />
                                    </TouchableWithoutFeedback>                                     
                                </View>
                            )}
                        </View>
                        
                    </View>  
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Tempo de aula</Text>
                        {!showEdit ? (
                            <Text style={styles.value}>{timeLecture} minutos</Text>
                        ) : (
                            <TextInputMask 
                                style={styles.input}
                                type={'custom'}
                                placeholder="em minutos"
                                keyboardType="numeric"
                                options={{
                                    mask: "999"
                                }}
                                value={timeLecture}
                                onChangeText={handleTimeLecture}                            
                            />
                        )}                         
                    </View>
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Valor da aula</Text>
                        {!showEdit ? (
                            <Text style={styles.value}>{valueLecture}</Text>
                        ) : (
                            <TextInputMask 
                                style={styles.input}
                                type={'money'}
                                keyboardType="decimal-pad"
                                placeholder="R$ 0,00"
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={valueLecture}
                                onChangeText={handleValueLecture}                            
                            />
                        )}                         
                    </View>                    
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Taxa de deslocament</Text> 
                        {!showEdit ? (
                            <Text style={styles.value}>{valueMovement}</Text>
                        ) : (
                            <TextInputMask 
                                style={styles.input}
                                type={'money'}
                                keyboardType="decimal-pad"
                                placeholder="R$ 0,00"
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={valueMovement}
                                onChangeText={handleValueMovement}                            
                            />
                        )}                         
                    </View>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1        
    },
    section: {
        paddingTop: 30,
        paddingBottom: 25
    },
    options: {
        paddingTop: 10
    },
    editButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        alignItems: "center"
    },
    input: {
        borderColor: "#fff",
        color: "#707070",
        height: 40,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginTop: 10
        
   },
    alignIcons: {
        marginRight: 20
    },
    saveIcons: {
        flexDirection: "row"        
    },
    option: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    optionText: {
        color: "#707070",
        fontSize: 18,
        marginLeft: 10
    },
    sectionTitle: {
        paddingHorizontal: 30             
    },
    title: {
        fontSize: 20,
        color: "#707070"
    },
    separator: {
        height: 1,
        backgroundColor: "#e3e3e3"
    },
    day: {
        paddingHorizontal: 45,
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    dayText: {
        textAlign: "center",
        marginVertical: 10
    },
    inputSection: {
        marginVertical: 10,
        paddingHorizontal: 45,
    },
    label: {
        color: "#707070",
        fontSize: 15
    },
    value: {
        color: "#707070",
        fontSize: 15,
        paddingLeft: 10,
        marginTop: 10
    }
});

const MapStateToProps = state => {
    return {        
        type: state.account.type,
        days: state.account.extraInfo.days,
        lectures: state.account.extraInfo.lectures,
        lectureTime: state.account.extraInfo.lectureTime,
        lectureValue: state.account.extraInfo.lectureValue,
        movementValue: state.account.extraInfo.movementValue,
    }
}

export default connect(MapStateToProps, { setDays, setLectures, setLectureInfo })(LecturesComponent);