import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import { getProfessors } from "../../../services/Lecture/action";
import SearchHeader from "../components/header";
import TeacherBlock from "../components/teacherBlock";

const Dados = [1, 2, 3 , 4]

const { width } = Dimensions.get("screen");

function Home({ getProfessors, professors, loading, data, navigation }) {

    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if(status != 'granted')
                alert("");

            let location = await Location.getCurrentPositionAsync({});
            mountFilter(location);
        })();

    }, []);

    const mountFilter = location => {

        const filter = {
            location
        }

        getProfessors(filter);
    }

    const renderEmptyList = () => <Text>Lista está vazia!</Text>

    const renderFooter = () => {
        if(professors.length !== 0) {
            return <Text>Não há mais professores</Text>;
        }

        return null;
    }

    const extractor = (item, index) => index.toString();


    const renderProfessor = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("TeacherProfile", { teacherId: index })}>
                <TeacherBlock />
                {!(index === (Dados.length - 1)) && <View style={styles.dividor}/>}
            </TouchableWithoutFeedback>
        );
    }

    const renderMore = () => {}

    const refresh = () => {}

    return (
        <SafeAreaView style={styles.container}>
            <SearchHeader />
            <FlatList 
                contentContainerStyle={styles.list}
                data={Dados}
                renderItem={renderProfessor}
                keyExtractor={extractor}
                ListEmptyComponent={renderEmptyList}
                ListFooterComponent={renderFooter}
                onEndReached={renderMore}
                onRefresh={refresh}
                refreshing={isRefreshing}                
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderWidth: 1,
        paddingBottom: 75
    },
    list: {
        flexGrow: 1,
        width,
        paddingHorizontal: 5,
    },
    dividor: {
        height: 1,
        backgroundColor: "#e3e3e3",
        marginVertical: 15
    } 
});

const MapStateToProps = state => {
    return {
        professors: state.lecture.professors,
        loading: state.lecture.loading,
        data: state.account
    }
}

export default connect(MapStateToProps, { getProfessors })(Home);