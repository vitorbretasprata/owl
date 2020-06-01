import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";

import { getProfessors } from "../../../services/Lecture/action";


function Home({ getProfessors, professors, loading }) {

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

    const renderEmptyList = () => (
        <Text>Lista está vazia!</Text>
    )

    const renderFooter = () => (
        <Text>Não há mais professores</Text>
    )

    const renderMore = () => {
        console.log()
    }

    const refresh = () => {

    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={professors}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={renderEmptyList}
                ListFooterComponent={renderFooter}
                onEndReached={renderMore}
                onRefresh={refresh}
                refreshing={isRefreshing}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
});

const MapStateToProps = state => {
    return {
        professors: state.lecture.professors,
        loading: state.lecture.loading
    }
}

export default connect(MapStateToProps, { getProfessors })(Home);