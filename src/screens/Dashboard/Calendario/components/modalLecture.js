import React, { memo, useState } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity    
} from "react-native";
import { Text } from "galio-framework";

import Loading from "../../../../components/loading";

const { width } = Dimensions.get("screen");

export default memo(({ showModal, closeModal, deleteSelected }) => {   

    const [isExecutingData, setIsExecutingData] = useState(false);

    const deleteItem = async () => {
        setIsExecutingData(true);
        await deleteSelected();
        closeModal();        
    }

    const cleanModal = () => {
        setIsExecutingData(false);
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
            <Loading loading={isExecutingData}/>
            <View style={styles.modal}>
                <View style={styles.body}>
                    <Text style={styles.warning}>
                        Tem certeza que deseja cancelar esta aula? 
                        (Uma taxa de R$ 8,00 será cobrada pelo cancelamento)
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={cleanModal}>
                            <Text style={{...styles.text, color: "#707070"}}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteItem}>
                            <Text style={{...styles.text, color: "#F58738"}}>Sim</Text>
                        </TouchableOpacity>
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
        padding: 10,
    }, 
    buttons: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 1000
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