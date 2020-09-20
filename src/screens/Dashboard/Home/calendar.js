import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, InteractionManager, Text } from "react-native";
import { connect } from "react-redux";
import { Icon } from "galio-framework";
import { BaseButton } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from "react-native-flash-message";

import { scheduleClass } from "../../../services/Account/action";

import PaymentModal from "./components/paymentModal";

const { width } = Dimensions.get("screen");

function TeacherCalendar({ scheduleClass, route: { params }, id }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [ISODate, setISODate] = useState(new Date(1598051730000));

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardDigits, setCardDigits] = useState("");

    const [selectedHour, setSelectedHour] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePaymentModal = () => setShowPaymentModal(true);
    const closePaymentModal = () => setShowPaymentModal(false);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            loadCalendar();
        });

        return () => {
            setShow(false);
        }
    }, []);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };

    const loadCalendar = (id) => {
        setIsLoading(false);
    }

    const handleDate = (event, selectedDate) => {
        if(selectedDate) {
            if(mode === 'date') {
                showTimepicker();
            } else {
                const currentDate = selectedDate || date;
                const { nativeEvent: { timestamp } } = event;

                setISODate(currentDate);
                convertDate(timestamp);
                setShow(false);
            }
        }
    }

    const convertDate = timestamp => {
        const d = new Date(timestamp);

        const convertedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        const convertedTime = `${d.getHours()}:${d.getMinutes()}`;

        setSelectedDate(convertedDate);
        setSelectedHour(convertedTime);
    }

    const converDateSchedule = (date) => {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }

    const saveBankInfo = ({ bank, cardNumber, cardDate, cardDigits }) => {
        setCardDate(cardDate);
        setCardDigits(cardDigits);
        setCardNumber(cardNumber);
    }

    const handleSchedule = () => {
        const isEmpty = !(selectedHour && selectedDate && cardNumber && cardDate && cardDigits);
        setIsProcessing(true);

        if(isEmpty) {
            displayMessage("danger", "Error", "A data ou a hora estão vazias, favor preencha-as corretamente.");
        } else {

            const convertedDate = converDateSchedule(ISODate);
            const { teacherInfo } = params;

            const scheduleInfo = {
                teacher_id: teacherInfo.id,
                student_id: id,
                nome: teacherInfo.name,
                date: `${ISODate.getFullYear()}-${ISODate.getMonth()}-${ISODate.getDate()} ${ISODate.getHours()}:${ISODate.getMinutes()}`,
                valor: 25.50,
                local: "Online"
            }

            scheduleClass(convertedDate, scheduleInfo);
            displayMessage("success", "Agendamento", "Sua solicitação de agendamento foi enviada, aguarde a aceitação do professor.");
        }
        setIsProcessing(true);
    }

    const displayMessage = (type, title, message) => {
        showMessage({
            message: title,
            description: message,
            type: type,
            duration: 3000
        });
    }

    if(isLoading) {
        return (
            <View style={styles.container}>

            </View>
        );
    }

    if(error) {
        return (
            <View style={styles.container}>

            </View>
        );
    }

    return (
        <View style={styles.container}> 
            <PaymentModal 
                showModal={showPaymentModal}
                closeModal={closePaymentModal}
                setBankInfo={saveBankInfo}
            />
            <View style={styles.insideContainer}>
                <Text style={styles.date}>
                    Data
                </Text>
                <BaseButton onPress={showDatepicker} style={styles.actionButton}>
                    <Icon 
                        name="calendar"
                        family="AntDesign"
                        color="#fff"
                        size={20}
                    />
                </BaseButton>
            </View>
            <View style={{...styles.insideContainer, marginTop: 10}}>
                <Text style={styles.dateInfo}>
                    Data
                </Text>
                <Text style={styles.dateInfo}>
                    {selectedDate || "N/A"}
                </Text>
            </View>

            <View style={{...styles.insideContainer, marginTop: 10}}>
                <Text style={styles.dateInfo}>
                    Horário
                </Text>
                <Text style={styles.dateInfo}>
                    {selectedHour || "N/A"}
                </Text>
            </View>

            <View style={styles.divisor} />

            <View style={styles.insideContainer}>
                <Text style={styles.date}>
                    Pagamento
                </Text>
                <BaseButton onPress={handlePaymentModal} style={styles.actionButton}>
                    <Icon 
                        name="creditcard"
                        family="AntDesign"
                        color="#fff"
                        size={20}
                    />
                </BaseButton>
            </View>
            <View style={{...styles.insideContainer, marginTop: 10}}>
                <Text style={styles.dateInfo}>
                    Número
                </Text>
                <Text style={styles.dateInfo}>
                    {cardNumber || "N/A"}
                </Text>
            </View>

            <View style={{...styles.insideContainer, marginTop: 10}}>
                <Text style={styles.dateInfo}>
                    Data
                </Text>
                <Text style={styles.dateInfo}>
                    {cardDate || "N/A"}
                </Text>
            </View>

            <View style={{...styles.insideContainer, marginTop: 10}}>
                <Text style={styles.dateInfo}>
                    Digitos
                </Text>
                <Text style={styles.dateInfo}>
                    {cardDigits || "N/A"}
                </Text>
            </View>

            <BaseButton 
                style={{...styles.actionButton, marginTop: 25, paddingHorizontal: 15  }} 
                onPress={handleSchedule}
                enabled={!isProcessing}
            >
                <Text style={styles.buttonText}>
                    Agendar
                </Text>
            </BaseButton>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={ISODate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleDate}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 15,
        paddingHorizontal: 15
    },
    buttonText: {
        color: "#fff"
    },
    insideContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    actionButton: {
        padding: 10,
        backgroundColor: "#F58738",
        borderRadius: 20,
        marginVertical: 10
    },
    date: {
        fontSize: 26,
        color: "#F58738",
    },
    dateInfo: {
        fontSize: 18
    },
    divisor: {
        width,
        backgroundColor: "#e3e3e3",
        height: 1,
        marginVertical: 15
    }
});

const mapStateToProps = state => {
    return {
        days: state.account.extraInfo.days,
        id: state.account.id
    }
}

export default connect(mapStateToProps, { scheduleClass })(TeacherCalendar);