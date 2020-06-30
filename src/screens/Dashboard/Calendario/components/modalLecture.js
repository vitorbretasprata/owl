import React, { memo } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

const { width } = Dimensions.get("screen");

export default memo(({ showModal, closeModal, deleteSelected }) => {   

    const deleteItem = () => {
        deleteSelected();
        closeModal();
    }

    const cleanModal = () => {
        closeModal();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onDismiss={cleanModal}
            onRequestClose={cleanModal}
        >
            <View style={styles.modal}>
                <View style={styles.body}>
                    <Text style={styles.warning}>
                        Tem certeza que deseja cancelar esta aula? 
                        (Uma taxa de R$ 8,00 será cobrada pelo cancelamento)
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback onPress={cleanModal}>
                            <Text style={{...styles.text, color: "#707070"}}>Não</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={deleteItem}>
                            <Text style={{...styles.text, color: "#F58738"}}>Sim</Text>
                        </TouchableWithoutFeedback>
                    </View>                    
                </View>                
            </View>
        </Modal>
    );
})

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
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10
    }, 
    buttons: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },   
    warning: {
        color: "#707070",
        padding: 5,
        marginBottom: 15,
        textAlign: "center"
    },
    text: {
        fontSize: 20
    }
});