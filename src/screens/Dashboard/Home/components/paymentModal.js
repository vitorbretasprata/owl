import React, { useState, memo } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback
} from "react-native";
import { Text, Icon } from "galio-framework";
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from "@react-native-community/picker";

const { width } = Dimensions.get("screen");

const banks = [
    {
        name: "Banco do Brasil",
        code: "001"
    },
    {
        name: "Bradesco",
        code: "237"
    },
    {
        name: "Caixa Econômica",
        code: "104"
    },
    {
        name: "Santander",
        code: "033"
    },
];

export default memo(({ showModal, closeModal, setBankInfo }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState("");

    const [bank, setBank] = useState("001");
    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardDigits, setCardDigits] = useState("");

    const handleCardNumber = text => setCardNumber(text);
    const handleCardDate = text => setCardDate(text);
    const handleCardDigits = text => setCardDigits(text);

    const saveModal = () => {
        setLoading(true);

        const values = (cardNumber && cardDate && cardDigits);
        if(values) {
            const info = {
                bank,
                cardNumber,
                cardDate,
                cardDigits
            }

            setError("");
            setLoading(false);
            setBankInfo(info);
            cleanModal();
        } else {
            setError("O valor do campo está vazio ou inválido.");
            setLoading(false);
        }
    }

    const handlerPicker = code => setBank(code);

    const renderOptions = bank => <Picker.Item label={bank.name} value={bank.code} key={bank.code}/>;

    const cleanModal = () => {
        setError("");
        setCardNumber("");
        setCardDate("");
        setCardDigits("");
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
                    <Text style={styles.title}>Informe seu cartão</Text>
                    <Picker
                        selectedValue={bank}
                        onValueChange={handlerPicker}
                    >
                        {banks.map(renderOptions)}
                    </Picker>
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
                            style={{...styles.input, flex: 1, marginRight: 10 }}
                            type={'datetime'}
                            placeholder="Data"
                            options={{
                              format: 'MM/YY'
                            }}
                            value={cardDate}
                            onChangeText={handleCardDate}
                        />

                        <TextInputMask 
                            style={{...styles.input, flex: 1, marginLeft: 10}}
                            type={'only-numbers'}
                            placeholder="Digitos"
                            keyboardType="numeric"
                            options={{
                                mask: "999",
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      fontSize: 16,
      marginVertical: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 10
    },
    alignInputs: {
      flexDirection: "row",
      justifyContent: "space-between"
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
        marginVertical: 5,
        justifyContent: "center",
        backgroundColor: "#e3e3e3",
        height: 40,
        backgroundColor: "#fff",
        borderColor: "#e4e4e4",
        borderBottomWidth: 1
    }
});