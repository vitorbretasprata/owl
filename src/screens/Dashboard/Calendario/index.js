import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";

import { getProfessors } from "../../../services/Lecture/action";
import SearchHeader from "../components/header";

function Calendario({ getProfessors, professors, loading }) {

    const [isRefreshing, setisRefreshing] = useState(false);

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

    const renderEmptyList = () =>  <Text>Lista está vazia!</Text>

    const renderFooter = () => {
        if(professors.length !== 0) {
            return <Text>Não há mais professores</Text>;
        }

        return null;
    }

    const renderProfessor = item => (
        <View style={styles.block}>

        </View>
    )

    const renderMore = () => {
        console.log()
    }

    const refresh = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchHeader />
            <FlatList 
                contentContainerStyle={styles.list}
                data={professors}
                renderItem={({ item }) => renderProfessor(item)}
                keyExtractor={(item, index) => index}
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
        alignItems: "center"
    },
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    }
});

const MapStateToProps = state => {
    return {
        professors: state.lecture.professors,
        loading: state.lecture.loading
    }
}

export default connect(MapStateToProps, { getProfessors })(Calendario);