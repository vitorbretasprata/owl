import React, { useState, memo } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback,
    TextInput,
    ActivityIndicator
} from "react-native";
import { Text, Icon } from "galio-framework";
import { TextInputMask } from 'react-native-masked-text';

const { width } = Dimensions.get("screen");

export default memo(({ showModal, closeModal, handleBankInfo }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [cpf, setCPF] = useState("");
    const [name, setName] = useState("");
    const [agency, setAgency] = useState("");
    const [bankAccount, setBankAccount] = useState("");

    const handleCPF = (maskedText, rawText) => setCPF(rawText);
    const handleName = text => setName(text);
    const handleAgency = (maskedText, rawText) => setAgency(rawText);
    const handleBankAccount = (maskedText, rawText) => setBankAccount(rawText);

    const TestaCPF = (strCPF) => {
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
    
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    const saveModal = () => {
        setLoading(true);

        const isCPFValid = TestaCPF(cpf);

        if(!isCPFValid) {
            setError("CPF inválido.");
            setLoading(false);
            return;
        }

        const isValid = (name && agency && bankAccount);

        if(!isValid) {
            setError("O valor do campo está vazio ou inválido.");
            setLoading(false);
            return;
        }

        setError("");

        const bankInfo = {
            agency,
            cpf,
            bankAccount,
            completeName: name
        }

        handleBankInfo(bankInfo);
        cleanModal();
    }

    const cleanModal = () => {
        setLoading(false);
        setCPF("");
        setName("");
        setAgency("");
        setBankAccount("");
        setError("");
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
                    <Text style={styles.title}>Editar dados bancários</Text>
                    <View style={styles.error}>
                        <Text style={styles.errMessage}>{error}</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInputMask 
                            style={styles.input}
                            type={'cpf'}
                            placeholder="CPF"
                            keyboardType="numeric"
                            value={cpf}
                            includeRawValueInChangeText={true}
                            onChangeText={handleCPF}
                        />
                    </View>

                    <View style={styles.input}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Nome completo"
                            value={name}
                            onChangeText={handleName}
                        />
                    </View>

                    <View style={styles.alignInputs}>
                        <TextInputMask
                            style={{...styles.input, ...styles.smallerInput }}
                            type={'custom'}
                            placeholder="Agência"
                            keyboardType="numeric"
                            value={agency}
                            options={{
                                mask: "9999-9"
                            }}
                            includeRawValueInChangeText={true}
                            onChangeText={handleAgency}
                        />
                        <TextInputMask 
                            style={{...styles.input, ...styles.smallerInput }}
                            type={'custom'}
                            placeholder="Conta"
                            value={bankAccount}
                            keyboardType="numeric"
                            options={{
                                mask: "99.999-9"
                            }}
                            includeRawValueInChangeText={true}
                            onChangeText={handleBankAccount}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback 
                          onPress={cleanModal} 
                        >
                            <Icon 
                                name="close" 
                                family="AntDesign" 
                                color="#707070" 
                                size={25} 
                            />
                        </TouchableWithoutFeedback>

                        {loading &&  <ActivityIndicator size="small" color="#F58738" />}

                        <TouchableWithoutFeedback 
                          onPress={saveModal} 
                        >
                            <Icon 
                                name="check" 
                                family="AntDesign" 
                                color="#F58738" 
                                size={25} 
                            />
                        </TouchableWithoutFeedback>
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
        paddingHorizontal: 25,
        backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      fontFamily:"Roboto",
      marginVertical: 10,
      color: "#F58738"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 10
    },
    alignInputs: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10
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
    },
    smallerInput: {
        width: "35%"
    }
});