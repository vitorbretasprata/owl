import React, { memo } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
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
                    <RectButton
                        onPress={deleteItem} 
                        style={styles.btn}
                    >
                        <Text style={styles.text}>Delete</Text>
                    </RectButton>
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
    },    
    btn: {
        padding: 20
    },
    text: {
        fontSize: 20
    }
});