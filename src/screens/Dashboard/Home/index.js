import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, InteractionManager } from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import { fetchProfessors } from "../../../services/Lecture/action";
import { getInfoAccount } from "../../../services/Account/action";
import SearchHeader from "../components/header";
import TeacherBlock from "../components/teacherBlock";
import AuthContext from "../../../context/authContext";


const Dados = [1, 2, 3 , 4]

const { width } = Dimensions.get("screen");

function Home({ fetchProfessors, fetchMoreProfessors, professors, loading, data, navigation }) {
    const authContext = useContext(AuthContext);

    const [filter, setFilter] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [pagination, setPagination] = useState({})
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(authContext.token);
        fetchProfessors({}, token);
        console.log(professors.length)
    }, []);


    const renderEmptyList = () => <View style={styles.emptyList}><Text>Lista está vazia!</Text></View>;

    const renderFooter = () => {
        return null;
    }

    const extractor = (item) => item.id.toString();

    const renderProfessor = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("TeacherProfile", { teacherId: item.id })}>
                <TeacherBlock professor={item} />
            </TouchableWithoutFeedback>
        );
    }

    const renderMore = () => {}

    const refreshList = () => {
        setRefresh(true);
        fetchProfessors({}, token);
        setRefresh(false);
    }


    return (
        <SafeAreaView style={styles.container}>
            {!loading && (
                <>
                    <SearchHeader />
                    <FlatList 
                        contentContainerStyle={styles.list}
                        data={professors}
                        renderItem={renderProfessor}
                        keyExtractor={extractor}
                        ListEmptyComponent={renderEmptyList}
                        ListFooterComponent={renderFooter}
                        onEndReached={renderMore}
                        onRefresh={refreshList}
                        ItemSeparatorComponent={<View style={styles.divisor}/>}
                        refreshing={refresh}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingBottom: 75
    },
    list: {
        flexGrow: 1,
        width,
        paddingHorizontal: 5,
    },
    emptyList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    divisor: {
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

//() => navigation.navigate("TeacherProfile", { teacherId: index })

export default connect(MapStateToProps, { fetchProfessors, getInfoAccount })(Home);