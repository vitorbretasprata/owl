import React, { useRef, useReducer, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { TextInputMask } from 'react-native-masked-text';
import { FlatList, ScrollView, BaseButton } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import YearsModal from "../components/modal";
import Loading from "../../../components/loading";
import { SetAccountInfo } from "../../../services/Account/action";
import { lecturesConstant } from "../../constants/index";
import LectureItem from "./components/lectureItem";

const { Value, interpolate } = Animated;

const WidthScreen = Dimensions.get("screen").width - 80;
const position = new Value(0.20);
let index = 0;
const transPosition = withTransition(position);

const positionTrans = interpolate(transPosition, {
    inputRange: [0.20, 0.4, 0.6, 0.8, 1],
    outputRange: [40, 80, 120, 160, 200]
});

const emptyClasses = {    
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: []
}

function ConfigTeacher({ SetAccountInfo, loading }) {
    
    const scrollRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [lectureSelected, setLectureSelected] = useState({});
    const [buttonLoading, setButtonLoading] = useState(false);

    const [lectureTime, setLectureTime] = useState("");
    const [phone, setPhone] = useState("");
    const [lectureValue, setLectureValue] = useState("");
    const [movementValue, setMovementValue] = useState("");
    const [cpf, setCPF] = useState("");
    const [name, setName] = useState("");
    const [agency, setAgency] = useState("");
    const [bankAccount, setBankAccount] = useState("");


    const [selectedClasses, dispatch] = useReducer((state, action) => {
        return {
            ...state,
            [action.key]: action.selectedClasses
        }
    }, emptyClasses);

    useEffect(() => {
        return () => {
            position.setValue(0.20);
            index = 0;
        }
    }, []);

    const submitInfo = () => {
        setButtonLoading(true);
        switch(index) {
            case 0:
                if(checkLectures()) {
                    handleScroll();
                }
                break;
            case 1:
                if(checkEmpty("lectureTime")) {
                    handleScroll();
                }
                break;
            case 2:
                if(checkEmpty("phone")) {
                    handleScroll();
                }
                break;
            case 3:
                if(checkBank()) {
                    handleScroll();
                }
                break;
            case 4: 
                if(checkEmpty("values")) {
                    const type = 3;
                    const Info = {
                        lectures: selectedClasses,
                        lectureTime,
                        lectureValue,
                        movementValue,
                        phone,
                        bankInfo: {
                            completeName: name,
                            cpf,
                            agency,
                            bankAccount
                        }
                    }
                    SetAccountInfo(type, Info);
                }
                break;
            default: 
                break; 
        }
        setButtonLoading(false);
    }

    const checkEmpty = field => {
        switch(field) {
            case "lectureTime": 
                if(lectureTime === "") {
                    displayError("Todos os campos devem ser preenchidos.");
                    return false;
                }
                break;
            case "phone": 
                if(phone === "") {
                    displayError("Todos os campos devem ser preenchidos.");
                    return false;
                }
                break;
            case "values": 
                if(lectureValue === "" || movementValue === "") {
                    displayError("Todos os campos devem ser preenchidos.");
                    return false;
                }
                break;
            default:
                break;
        }

        return true;
    }

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
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    const checkLectures = () => {

        const lecturesArr = Object.keys(selectedClasses);
        let aux = "";
        for(let i = 0; i < lecturesArr.length; i++) {
            aux = lecturesArr[i];
            if(selectedClasses[aux].length > 0) 
                return true;
        }

        displayError("Selecione pelo menos uma matéria.");
        return false;
    }

    const checkBank = () => {
        if(!TestaCPF(cpf.toString())) {
            displayError("CPF inválido.");
            return false;
        }

        if(name === "" || agency === "" || bankAccount === "") {
            displayError("Todos os campos devem ser preenchidos.");
            return false;
        }

        return true;
    }

    const decrement = () => {
        if(0 <= index && 0 <= position._value) {
            index--;
            const aux = index / 5 ;
            position.setValue(aux);
        }
    }

    const displayError = msg => {
        showMessage({
            message: "Error",
            description: msg,
            type: "danger",
            duration: 2890
        });
    }

    const handleLectureTime = text => setLectureTime(text);
    const handleLectureValue = text => setLectureValue(text);
    const handleMovementValue = text => setMovementValue(text);
    const handleCompleteName = text => setName(text);

    const handleCPF = (maskedText, rawText) => setCPF(rawText);
    const handlePhone = (maskedText, rawText) => setPhone(rawText);
    const handleAgency = (maskedText, rawText) => setAgency(rawText);
    const handleBankAccount = (maskedText, rawText) => setBankAccount(rawText);

    const increment = () => {
        if(index <= 4 && position._value <= 0.99) {
            index++;
            const aux = (index + 1) / 5;
            position.setValue(aux);
        }
    }

    const handleScroll = () => {
        if(scrollRef.current.scrollTo) {
            increment();
            scrollRef.current.scrollTo({
                animated: true,
                x: WidthScreen * index,
                y: 0
            });
        }
    }

    const handleModal = item => {
        const index = lecturesConstant.indexOf(item) + 1;
        const lecture = {
            index,
            className: item,
            selectedClasses: selectedClasses[index]
        }
        setLectureSelected(lecture);
        setShowModal(true);
    }

    const close = () => setShowModal(false);

    const handleSaveYears = (years, key) => {
        dispatch({
            key: key,
            selectedClasses: years
        });
    }

    return (
        <Background>
            <Loading loading={loading} />
            <YearsModal 
                showModal={showModal}
                closeModal={close}
                lecture={lectureSelected}
                saveSelectedYears={handleSaveYears}
            />
            <View style={styles.container}>
                <ProgressBar progressWidth={positionTrans}/>
                <ScrollView
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollWidth}
                >
                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Especialidades</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Adicione as matérias que você deseja lecionar
                        </Text>
                        <View style={styles.scrollWidth}>
                            <FlatList 
                                data={lecturesConstant}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ marginTop: 120 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <LectureItem 
                                        arrayLength={selectedClasses[index + 1].length} 
                                        handleClickModal={handleModal} 
                                        itemName={item}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o tempo de sua aula (em minutos)
                        </Text>
                        <TextInputMask 
                            style={styles.input}
                            type={'custom'}
                            placeholder="em minutos"
                            keyboardType="numeric"
                            options={{
                                mask: "999"
                            }}
                            value={lectureTime}
                            onChangeText={handleLectureTime}
                        />

                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Telefone</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe seu número de telefone
                        </Text>
                        <TextInputMask 
                            style={styles.input}
                            type={'cel-phone'}
                            placeholder="(XX) XXXXX-XXXX"
                            keyboardType="numeric"
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                              }}
                            value={phone}
                            includeRawValueInChangeText={true}
                            onChangeText={handlePhone}
                        />
                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Dados Bancários</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe sua conta bancária
                        </Text>
                        <TextInputMask 
                            style={styles.input}
                            type={'cpf'}
                            placeholder="CPF"
                            keyboardType="numeric"
                            value={cpf}
                            includeRawValueInChangeText={true}
                            onChangeText={handleCPF}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Nome completo"
                            value={name}
                            onChangeText={handleCompleteName}
                        />
                        <View style={styles.bankInfo}>
                            <TextInputMask
                                style={styles.smallerInput}
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
                                style={styles.smallerInput}
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
                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o valor de cada aula
                        </Text>
                        <View style={styles.addChild}>
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
                                value={lectureValue}
                                onChangeText={handleLectureValue}
                            />
                        </View>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe uma taxa de deslocamento
                        </Text>
                        <View style={styles.addChild}>
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
                                value={movementValue}
                                onChangeText={handleMovementValue}
                            />
                        </View>
                    </View>

                </ScrollView>

                <BaseButton
                    style={styles.button}
                    onPress={submitInfo}
                >
                    <View accessible>
                        {
                            buttonLoading ?
                                <ActivityIndicator size="small" color="#fff" />
                                :
                                <Text style={styles.textColor}>{index >= 4 ? "Concluir" : "Próximo"}</Text>
                        }
                    </View>
                </BaseButton>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center",
       justifyContent: "space-between",
       paddingVertical: 15
   },
   scrollWidth: {
        width: WidthScreen
   },
   button: {
        width: "100%",
        backgroundColor: "#F58738",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        height: 45
   },
   addChild: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        width: "100%"
   },
   input: {
        borderColor: "#fff",
        color: "#707070",
        height: 40,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 10
   },
   smallerInput: {
        borderColor: "#fff",
        color: "#707070",
        height: 40,
        width: "40%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15
    },
   bankInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
   },
   textColor: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10
   },
   white: {
       color: "#fff"
   },
   textTitle: {
        fontSize: 35
   },
   textDesc: {
        fontSize: 15
   }
});

const mapStateToProps = state => {
    return {
        loading: state.account.loading
    }
}

export default connect(mapStateToProps, { SetAccountInfo })(ConfigTeacher);