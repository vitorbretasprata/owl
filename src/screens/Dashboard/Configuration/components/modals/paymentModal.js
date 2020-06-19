import React, { useState, memo } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
} from "react-native";
import { connect } from "react-redux";
import { Text, Input, Icon } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TextInputMask } from 'react-native-masked-text';

import { setPaymentMethods } from "../../../../../services/Account/action";

const { width } = Dimensions.get("screen");

export default memo(({ showModal, closeModal }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardDigits, setCardDigits] = useState("");

    const handleCardNumber = text => setCardNumber(text);
    const handleCardDate = text => setCardDate(text);
    const handleCardDigits = text => setCardDigits(text);

    const saveModal = () => {
        setLoading(true);
        const rg = new RegExp(/[0-9]/g)
        if(value === "" || rg.test(value)) {
            setError("O valor do campo está vazio ou inválido.");
            setLoading(false);

        } else {
            setError("");
            setLoading(false);
            setDependents(value);
            cleanModal();
        }
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
                    <Text style={styles.title}>Adicionar novo metodo de pagamento</Text>
                    <View style={styles.input}>
                        <TextInputMask 
                            style={styles.input}
                            type={'credit-card'}
                            placeholder="Numero do cartão"
                            keyboardType="numeric"
                            options={{
                              obfuscated: false,
                              issuer: 'amex'
                            }}
                            value={cardNumber}
                            onChangeText={handleCardNumber}                            
                        />
                    </View>

                    <View style={styles.alignInputs}>
                        <TextInputMask 
                            style={styles.input}
                            type={'datetime'}
                            options={{
                              format: 'MM/YY'
                            }}
                            value={cardDate}
                            onChangeText={handleCardDate}                            
                        />

                        <TextInputMask 
                            style={styles.input}
                            type={'only-numbers'}
                            placeholder="Digitos"
                            keyboardType="numeric"
                            options={{
                                mask: "999"
                            }}
                            value={cardDigits}
                            onChangeText={handleCardDigits}                            
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback 
                          onPress={cleanModal} 
                          style={styles.btn}
                        >
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

                        <TouchableWithoutFeedback 
                          onPress={saveModal} 
                          style={styles.btn}
                        >
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
        width: width - 50,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        zIndex: 100
    }, 
    alignInputs: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 15
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