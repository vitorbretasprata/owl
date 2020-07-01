import React, { memo, useState } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Text, 
    Dimensions, 
    InteractionManager, 
    TouchableWithoutFeedback 
} from "react-native";
import Check from "../../components/checkBox";
import { yearsName } from "../../constants/index";
import { Icon } from "galio-framework";

const { width } = Dimensions.get("screen");

function YearsModal({ showModal, closeModal, lecture, saveSelectedYears }) {

    const [yearsChecked, setYearsCheked] = useState([]);
    const [loadingModal, setLoadingModal] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

    const handleShow = () => {
        InteractionManager.runAfterInteractions(() => {
            if(lecture) {
                chooseSelectedYears();
                setLoadingModal(false);
            }            
        });
    }    

    const handleAll = event => {
        console.log(event) 
        //const all = Array.apply(null, new Array(yearsChecked.length)).map(x => event);
        //setYearsCheked(all);
    }

    const chooseSelectedYears = () => {
        let newArr = Array.apply(null, new Array(yearsName.length)).map(x => false);
        if(lecture && lecture.selectedClasses.length === 0) {
            setYearsCheked(newArr);
        } else {
            for (let index = 0; index < lecture.selectedClasses.length; index++) {
                let i = lecture.selectedClasses[index];
                newArr[i] = true;                
            }    
            
            setYearsCheked(newArr);
        }        
        setLoadingModal(false);
    }

    const cleanModal = () => {
        setYearsCheked([]);
        closeModal();
        setLoadingModal(true);
    }

    const saveModal = () => {
        setLoadingSave(true);
        if(yearsChecked.includes(true)) {

            const indexArr = yearsChecked.reduce((arr, e, i) => {
                if(e) arr.push(i);
                return arr;
            }, []);
            
            saveSelectedYears(indexArr, lecture.className);

        }
        setLoadingSave(false);
        cleanModal();
    }

    const update = position => {
        const aux = yearsChecked;
        aux[position] = !aux[position];

        setYearsCheked(aux);
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
                                <Check label="Selecionar todos" updateAll={handleAll} initValue={yearsChecked.includes(false) ? false : true} />
                                {yearsChecked.map((y, i) => <Check label={yearsName[i]} initValue={y} updateCheck={update} key={i} position={i} />)}
                            </View>
                            
                            <View style={styles.buttons}>
                                <TouchableWithoutFeedback onPress={cleanModal}>
                                    <Icon 
                                        name="close" 
                                        family="AntDesign" 
                                        color="#707070" 
                                        size={25} 
                                    />
                                </TouchableWithoutFeedback>

                                <View>
                                    <Text>{loadingSave && "L"}</Text>
                                </View>

                                <TouchableWithoutFeedback onPress={saveModal}>
                                    <Icon 
                                        name="check" 
                                        family="AntDesign" 
                                        color="#F58738" 
                                        size={25} 
                                    />
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
        width: width - 50,
        borderRadius: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        zIndex: 100,
        paddingHorizontal: 30
    },
    titleModal: {
        textAlign: "center",
        fontSize: 16
    },    
    checkBtns: {
        marginVertical: 15
    }
});

export default memo(YearsModal);