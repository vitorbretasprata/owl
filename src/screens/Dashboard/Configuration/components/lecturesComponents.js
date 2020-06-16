import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { Text } from "galio-framework";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Modal from "./modals/lectureModal";
import { setDays, setLectures } from "../../../../services/Account/action";

const daysArr = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const lecturesArr = [
    "Matemática",
    "Português",
    "Química",
    "Biologia",
    "Física",
    "Ciências",
    "Inglês",
    "Espanhol",
    "Geografia",
    "História",
    "Francês"
];

const emptyClasses = {    
    "Matemática": [],
    "Português": [],
    "Química": [],
    "Biologia": [],
    "Física": [],
    "Ciências": [],
    "Inglês": [],
    "Espanhol": [],
    "Geografia": [],
    "História": [],
    "Francês": []
}

function LecturesComponent({ lectures, days, setLectures, setDays }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedDays, setSelectedDays] = useState(["Inglês", "Física"]);

    const handleLong = () => {
        setShowModal(true);
    }

    const close = () => {
        setShowModal(false);
    }

    const renderDays = ({ item }) => (
        <TouchableWithoutFeedback
            style={[styles.day, {  color: selectedDays.includes(item) ? "#F58738"  : "#707070" }]}
            onPress={() => handleDays(item)}
        >
            <Text style={[styles.dayText, { color: selectedDays.includes(item) ? "#F58738"  : "#707070" }]}>
                {item}
            </Text>
        </TouchableWithoutFeedback>
    );

    const handleDays = (item) => {
        if(selectedDays.includes(item)) {
            let aux = selectedDays;
            const index = aux.indexOf(item);
            if (index > -1) {
                aux.splice(index, 1);
                setSelectedDays(aux);
            }
        } else {
            setSelectedDays([...setSelectedDays, item]);
        }
    }

    const delItem = () => {
        set
    }

    const renderLectures = ({ item }) => (
        <TouchableWithoutFeedback
            style={[styles.day, { color: emptyClasses[item].length > 0 ? "#F58738"  : "#707070" }]}
            onPress={() => handleDays(item)}
        >
            <Text style={[styles.dayText, { color: emptyClasses[item].length > 0 ? "#F58738"  : "#707070" }]}>
                {item}
            </Text>
        </TouchableWithoutFeedback>
    )
    const handleKey = (index) => index.toString(); 

    return (
        <SafeAreaView style={styles.container}>
            <Modal 
                showModal={showModal}
                closeModal={close}
                selectedItem={1}
            />
            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>
                        Dias
                    </Text>

                </View>               
                    
                <FlatList 
                    data={daysArr}
                    renderItem={renderDays}
                    keyExtractor={handleKey}
                />

                <View style={styles.separator} />            
                
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>
                        Matérias Lecionadas
                    </Text>

                </View>               
                    
                <FlatList 
                    data={Object.keys(emptyClasses)}
                    renderItem={renderLectures}
                    keyExtractor={handleKey}
                />

                <View style={styles.separator} />            
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1        
    },
    section: {
        paddingTop: 30,
        paddingBottom: 25
    },
    options: {
        paddingTop: 10
    },
    option: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    optionText: {
        color: "#707070",
        fontSize: 18,
        marginLeft: 10
    },
    sectionTitle: {
        paddingHorizontal: 30             
    },
    title: {
        fontSize: 20,
        color: "#707070"
    },
    separator: {
        height: 1,
        backgroundColor: "#e3e3e3"
    },
    day: {
        width: "100%",
        borderColor: "#fff",
        borderWidth: 2,
        justifyContent: "center",
        paddingHorizontal: 15,
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
    },
    dayText: {
        textAlign: "center",
        marginVertical: 10
    }
});

const MapStateToProps = state => {
    return {        
        type: state.account.type,
        days: state.accout.extraInfo.days,
        lectures: state.accout.extraInfo.lectures
    }
}

export default connect(MapStateToProps, { setDays, setLectures })(LecturesComponent);