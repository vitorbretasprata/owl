import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, InteractionManager, StatusBar } from "react-native";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Agenda, LocaleConfig } from "react-native-calendars";

import { Icon } from "galio-framework";

LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
    today: 'Hoje\'Hoj'
  };

LocaleConfig.defaultLocale = 'pt';

const dates = { 
    "2020-06-27": [
        {
            aluno: "Vitor Prata",
            horarioInicio: "9:30",
            horarioTermino: "10:30",
            materia: "Matemática",
            valor: "R$ 84,00",
            local: "Gilberto Salomão"
        },
        {
            aluno: "Vitor Prata",
            horarioInicio: "11:30",
            horarioTermino: "12:30",
            materia: "Português",
            valor: "R$ 84,00",
            local: "Minha residência"
        }],
    '2020-06-28': [
        {
            aluno: "José Abreu",
            horarioInicio: "15:30",
            horarioTermino: "16:30",
            materia: "História",
            valor: "R$ 84,00",
            local: "Colégio Mackenzie"
        },
        {
            aluno: "Fábio Prata",
            horarioInicio: "7:30",
            horarioTermino: "8:30",
            materia: "Biologia",
            valor: "R$ 84,00",
            local: "Parque da cidade"
        }],
    '2020-06-29': [
        {
            aluno: "Jessica Prata",
            horarioInicio: "9:30",
            horarioTermino: "10:30",
            materia: "Fisica",
            valor: "R$ 84,00",
            local: "Hospital Brasília"
        },
        {
            aluno: "Ana",
            horarioInicio: "17:30",
            horarioTermino: "18:30",
            materia: "Português",
            valor: "R$ 84,00",
            local: "Minha residência"
        }],
    '2020-06-30': [
        {
            aluno: "Rodrigo Alvez",
            horarioInicio: "14:30",
            horarioTermino: "15:30",
            materia: "Matemática",
            valor: "R$ 84,00",
            local: "Minha residência"
        }]
}

function Calendario({ navigation }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setLoading(false);
        });        
    }, []);

    if(loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }

    const viewLecture = () => navigation.navigate("Lecture");

    const isDayAvailable = (date) => {
        let dt = new Date(date.year, date.month, date.day);
        console.log(dt.getDay())

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
    )

    const renderClass = (item, firstItemOFTheDay) =>  (
        <TouchableWithoutFeedback onPress={viewLecture}>
            <View style={styles.agendaDay}>
                <Text style={styles.cardTitle}>{item.aluno}</Text>
                <Text style={styles.cardTime}>{item.horarioInicio} - {item.horarioTermino}</Text>
                <Text style={styles.cardLecture}>{item.materia}</Text>
                <Text style={styles.cardValue}>{item.valor}</Text>
                <Text style={styles.cardLocation}>Local: {item.local}</Text>
            </View>
        </TouchableWithoutFeedback>        
    );

    const renderDay = (day, item) => {

        if(day) {
            isDayAvailable(day);
        }

        return null;               
    }

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
                renderItem={renderClass}
                renderEmptyData={handleEmptyData} 
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
        loading: state.lecture.loading
    }
}

export default connect(MapStateToProps, null)(Calendario);