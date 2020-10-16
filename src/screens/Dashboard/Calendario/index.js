import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, InteractionManager } from "react-native";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Agenda, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "galio-framework";

import { fetchActivityDay } from "../../../services/Account/action";

LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
    today: 'Hoje\'Hoj'
};

LocaleConfig.defaultLocale = 'pt';

function Calendario({ navigation, dates, fetchActivityDay, loading }) {

    const [loadingScreen, setLoadingScreen] = useState(true);
    const [daySelected, setDaySelected] = useState("");

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {

            (async () => {
                const date = new Date();
                const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                const token = await AsyncStorage.getItem("@user:token");
        
                fetchActivityDay(today, token);
            })();

            setLoadingScreen(false);

        });
    }, []);

    if(loadingScreen) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }

    const getTodaysLectures = async () => {
        
    }

    const selectDay = async day => {
        setDaySelected(day.dateString);
        const token = await AsyncStorage.getItem("@user:token");
        fetchActivityDay(day.dateString, token);
    }

    const viewLecture = (item) => {
        navigation.navigate("Lecture", {
            item,
            day: daySelected
        });
    }

    const handleEmptyData = () => (
        <View style={styles.emptyContainer}>
            <Icon 
                name="school"
                family="MaterialIcons"
                size={50}
                color="#707070"
            />
            <Text style={styles.emptyText}>Nenhuma atividade para este dia!</Text>
        </View>
    );

    const renderItems = (item) => (
        <TouchableWithoutFeedback onPress={() => viewLecture(item)}>
            <View style={styles.agendaDay}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardTime}>Horário: {item.horarioInicio}</Text>
                <Text style={styles.cardValue}>R$ {item.valor}</Text>
                <Text style={styles.cardLocation}>Local: {item.local}</Text>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <SafeAreaView style={styles.container}>
            <Agenda
                style={styles.agenda}
                items={dates}
                theme={{
                    agendaDayTextColor: '#F58738',
                    agendaDayNumColor: '#43b2de',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'orange'
                }} 
                renderItem={renderItems}
                renderEmptyData={handleEmptyData} 
                onDayPress={selectDay}
                onDayChange={selectDay}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    agenda: {
        width: "100%",
        flex: 1,
    },
    agendaDay: {
        width: "100%",
        height: 150,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    cardTitle: {
        fontSize: 23,
        marginVertical: 5,
        color: "#F58738"
    },
    cardTime: {
        fontSize: 15,
        color: "#a0a0a0"
    },
    cardLecture: {
        fontSize: 15,
        color: "#43b2de"
    },
    cardValue: {
        fontSize: 14,
        marginBottom: 8,
        color: "#afafaf"
    },
    cardLocation: {
        fontSize: 16,
        color: "#808080"
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    emptyText: {
        color: "#707070",
        fontSize: 18,
        marginVertical: 5
    }
});

const MapStateToProps = state => {
    return {
        loading: state.account.loading,
        dates: state.account.dates
    }
}

export default connect(MapStateToProps, { fetchActivityDay })(Calendario);