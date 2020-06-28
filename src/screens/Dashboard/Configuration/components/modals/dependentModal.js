import React, { memo, useState } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
} from "react-native";
import { Text, Input, Icon } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

export default memo(({ showModal, closeModal, addDependent }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState("initialState");

    const saveModal = () => {
        setLoading(true);
        const rg = new RegExp(/[0-9]/g)
        if(value === "" || rg.test(value)) {
            setError("O valor do campo está vazio ou inválido.");
            setLoading(false);
        } else {
            addDependent(value);
            cleanModal();
        }
    }

    const handleValue = text => setValue(text);
    
    const cleanModal = () => {
        setError("");
        setLoading(false);
        setValue("");
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
                    <Text>Novo dependente</Text>
                    <View style={styles.input}>
                        <Input
                            placeholder="Novo dependente"
                            right
                            icon="user"
                            family="antdesign"
                            iconSize={14}
                            iconColor="#707070"
                            onChangeText={handleValue}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback onPress={cleanModal} style={styles.btn}>
                            <Icon 
                                name="close" 
                                family="AntDesign" 
                                color="#707070" 
                                size={25} 
                            />
                        </TouchableWithoutFeedback>

                        <View>
                            <Text>{loading && "L"}</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={saveModal} style={styles.btn}>
                            <Icon 
                                name="check" 
                                family="AntDesign" 
                                color="#F58738" 
                                size={25} 
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.error}>
                        <Text style={styles.errMessage}>{error}</Text>
                    </View>
                </View>                
            </View>
        </Modal>
    );
}); 

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
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        zIndex: 100
    },    
    btn: {
        padding: 20
    },
    text: {
        fontSize: 20
    },
    error: {
        paddingVertical: 5,
        justifyContent: "center"
    },
    errMessage: {
        color: "#a81802",
        fontSize: 16
    },
    input: {
        paddingVertical: 5,
        justifyContent: "center"
    }
});

