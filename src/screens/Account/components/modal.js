import React, { memo, useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text, Dimensions, InteractionManager } from "react-native";
import Check from "./checkBox";
import { typeOne, typeTwo, typeThree, secondPeriod } from "../constants/constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

function YearsModal({ showModal, closeModal, lecture }) {

    const [yearsChecked, setYearsCheked] = useState([]);
    const [yearsName, setYearsName] = useState([]);
    const [loadingModal, setLoadingModal] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

    const handleShow = () => {
        InteractionManager.runAfterInteractions(() => {
            if(lecture) {
                chooseYear();                
            }            
        });
    }

    const handleChangeYears = (index) => {
        setYearsCheked(prevYearsChecked => {
            prevYearsChecked[index] = !prevYearsChecked[index]
        });
        setTimeout(() => console.log(yearsChecked), 500)
        
    }

    const handleAll = event => {
        const all = Array.apply(null, new Array(yearsChecked.length)).map(x => event);
        setYearsCheked(all);
    }

    useEffect(() => {
        if(yearsName.length !== 0) {
            chooseSelectedYears();
        }        
    }, [yearsName]);

    useEffect(() => {
        console.log(yearsChecked)       
    }, [yearsChecked]);

    const chooseYear = () => {
        if(secondPeriod.includes(lecture.className)){
            setYearsName(typeTwo)
        } else if (lecture.className === "Ciências") {
            setYearsName(typeOne);
        } else {
            setYearsName(typeThree);
        }
    }

    const chooseSelectedYears = () => {
        if(lecture.selectedClasses.length === 0) {
            setYearsCheked(Array.apply(null, new Array(yearsName.length)).map(x => false));
        } else {
            setYearsCheked(lecture.selectedClasses);
        }        
        setLoadingModal(false);
    }

    const cleanModal = () => {
        setYearsCheked([]);
        setYearsName([]);
        closeModal();
        setLoadingModal(true);
    }

    const saveModal = () => {
        setLoadingSave(true);
        if(yearsChecked.includes(true)) {

        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onShow={handleShow}
            onDismiss={cleanModal}
            onRequestClose={cleanModal}
        >
            <View style={styles.modal}>
                <View style={styles.body}>
                    {loadingModal ? (
                        <Text>Carregando...</Text>
                    ) : (
                        <>
                            <Text style={styles.titleModal}>Seleciona os anos que você deseja lecionar desta matéria</Text>
                            <View style={styles.checkBtns}>
                                <Check label="Selecionar todos" onChange={handleAll} />
                                {yearsChecked.map((y, i) => <Check label={yearsName[i]} initValue={y} onChange={() => handleChangeYears(i)} key={i} />)}
                            </View>
                            
                            <View style={styles.buttons}>
                                <TouchableWithoutFeedback onPress={cleanModal}>
                                    <Text style={[styles.btn, { color: "#707070"}]}>
                                        Cancelar
                                    </Text>
                                </TouchableWithoutFeedback>

                                <View>
                                    <Text>{loadingSave && "L"}</Text>
                                </View>

                                <TouchableWithoutFeedback onPress={saveModal}>
                                    <Text style={[styles.btn, { color: "#F58738"}]}>
                                        Salvar
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </>
                    )}                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        width: width - 100,
        borderRadius: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    titleModal: {
        textAlign: "center",
        fontSize: 16
    },
    btn: {
        fontSize: 20,
        fontWeight: "bold"
    },
    checkBtns: {
        marginVertical: 15
    }
});

export default memo(YearsModal);