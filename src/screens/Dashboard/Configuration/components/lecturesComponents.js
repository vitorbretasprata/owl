import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { TouchableWithoutFeedback, ScrollView, BaseButton } from "react-native-gesture-handler";
import { TextInputMask } from 'react-native-masked-text';

import LectureModal from "./modals/lectureModal";
import BankModal from "./modals/bankModal";
import { lecturesConstant } from "../../../constants/index";
import { setLectures, setLectureInfo, setBankAccount } from "../../../../services/Account/action";
import LectureList from "./lectureList";

function LecturesComponent(
    { 
        lectures, 
        bankInfo,
        setBankAccount,
        setLectures, 
        setLectureInfo, 
        lectureTime, 
        lectureValue, 
        movementValue 
    }
) {

    const [showLectureModal, setShowLectureModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);

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

    const _showLectureModal = lecture => {
        setSelectedLecture(lecture);
        setLectureArr(lectures[lecture]);
        setShowLectureModal(true);
    }

    const updateLectures = (arr, name) => {
        setLectures(arr, name);
    }

    const closeLectureModal = () => setShowLectureModal(false);
    const _showBankModal = () => setShowBankModal(true);
    const closeBankModal = () => setShowBankModal(false);
    const updateBankInfo = info => setBankAccount(info);

    return (
        <ScrollView style={styles.container}>
                <LectureModal 
                    showModal={showLectureModal}
                    closeModal={closeLectureModal}
                    selectedItem={selectedLecture}
                    selectedItemArr={lectureArr}
                    saveSelectedYears={updateLectures}
                />
                <BankModal 
                    showModal={showBankModal}
                    closeModal={closeBankModal}
                    handleBankInfo={updateBankInfo}
                />
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>
                            Dados Bancários
                        </Text>

                        <BaseButton onPress={_showBankModal}>
                            <Icon 
                                name="edit"
                                family="AntDesign"
                                color="#F58738"
                                size={25}
                            />
                        </BaseButton>
                    </View>

                    <View style={styles.bankInfoAlign}>
                        <View style={{...styles.bankInfo }}>
                            <Text style={styles.bankInfoTitle}>
                                CPF
                            </Text>
                            <Text style={styles.value}>
                                {bankInfo.cpf}
                            </Text>

                            <Text style={styles.bankInfoTitle}>
                                Nome Completo
                            </Text>
                            <Text style={styles.value}>
                                {bankInfo.completeName}
                            </Text>
                        </View>

                        <View style={{...styles.bankInfo }}>
                            <Text style={styles.bankInfoTitle}>
                                Agência
                            </Text>
                            <Text style={styles.value}>
                                {bankInfo.agency}
                            </Text>

                            <Text style={styles.bankInfoTitle}>
                                Conta
                            </Text>
                            <Text style={styles.value}>
                                {bankInfo.bankAccount}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>
                            Matérias Lecionadas
                        </Text>
                    </View>

                    {
                        lecturesConstant.
                            map((lecture, index) => {

                                return <LectureList 
                                lecture={lecture} 
                                index={index} 
                                showLectureModal={_showLectureModal}
                                length={lectures[index + 1].length}
                                keyCell={index}
                            />
                            }
                                )
                    }

                </View>

                <View style={styles.separator} />

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
                        <Text style={styles.label}>Taxa de deslocamento</Text> 
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
        paddingTop: 10,
        paddingBottom: 25,
        paddingHorizontal: 30
    },
    sectionTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    editButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bankInfoAlign: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    saveIcons: {
        flexDirection: "row"
    },
    option: {
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
    title: {
        fontSize: 20,
        color: "#707070"
    },
    separator: {
        height: 1,
        backgroundColor: "#e3e3e3"
    },
    inputSection: {
        marginVertical: 18
    },
    label: {
        color: "#707070",
        fontSize: 15
    },
    value: {
        color: "#909090",
        fontSize: 15,
        marginTop: 10
    },
    bankInfo: {
        marginTop: 18
    },
    bankInfoTitle: {
        fontSize: 16,
        color: "#707070",
        paddingVertical: 5
    }
});

const MapStateToProps = state => {
    return {
        type: state.account.type,
        bankInfo: state.account.extraInfo.bankInfo,
        lectures: state.account.extraInfo.lectures,
        lectureTime: state.account.extraInfo.lectureTime,
        lectureValue: state.account.extraInfo.lectureValue,
        movementValue: state.account.extraInfo.movementValue,
    }
}

export default connect(MapStateToProps, { setBankAccount, setLectures, setLectureInfo })(LecturesComponent);