import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, InteractionManager } from "react-native";
import { connect } from "react-redux";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "galio-framework";

import { fetchProfessors } from "../../../services/Lecture/action";
import { getInfoAccount } from "../../../services/Account/action";
import SearchHeader from "../components/header";
import TeacherBlock from "../components/teacherBlock";

import LectureList from "../components/lectureList";

import AuthContext from "../../../context/authContext";

const { width } = Dimensions.get("screen");

function Home({ fetchProfessors, fetchMoreProfessors, professors, loading, data, navigation }) {
    const authContext = useContext(AuthContext);

    const [filter, setFilter] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [pagination, setPagination] = useState({});
    const [focusHeader, setFocusHeader] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(authContext.token);
        fetchProfessors({}, token);
    }, []);


    const handleFilter = text => setFilter(text);
    const selectFilter = lecture => setFilter(lecture);

    const renderEmptyList = () => <View style={styles.emptyList}><Text>Lista está vazia!</Text></View>;

    const renderFooter = () => {
        return null;
    }

    const handleHeader = (value) => {
        setFocusHeader(value)
    }

    const extractor = (item) => item.id.toString();

    const renderProfessor = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback>
                <TeacherBlock
                    professor={item}
                />
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
                    <SearchHeader 
                        filterValue={filter}
                        handleFilter={handleFilter}
                        handleFocusHeader={handleHeader}
                    />
                    {
                        focusHeader && 
                        <LectureList 
                            filter={filter}
                            choose={selectFilter}
                        />
                    }
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