import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { connect } from "react-redux";
import { BaseButton, FlatList } from "react-native-gesture-handler";
import { Icon } from "galio-framework";
import AutoComplete from "react-native-autocomplete-input";

import LectureItem from "../components/lectureItem";
import { Lectures } from "../constants/constants";


const { width, height } = Dimensions.get("screen");

function SearchHeader() {

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if(isFocused) {
            inputRef.current.focus();
        }        
    }, [isFocused]);

    const data = Lectures.filter(lecture => lecture.includes(search));

    const handleInput = (text) => {
        console.log(text);
        setSearch(text);
    }

    const closeHeader = () => {
        if(isFocused) {
            setIsFocused(false);
            inputRef.current.blur();
            return;
        } else {
            setSearch("");
        }
    }

    const choose = (text) => setSearch(text);

    const renderLecture = ({ item, index }) => <LectureItem item={item} condition={index === (Lectures.length - 1)} chooseLecture={choose} />
    const extractor = (item, i) => i.toString();
    const handleProfile = () => alert("Profile");

    const handleFilter = () => alert("Filter");

    const openHeader = () => {
        setIsFocused(true);
    }

    const clearInput = () => setSearch("");

    return (
        <View>
            <View style={styles.container}>
                {(!(search === "") || isFocused) && (
                    <BaseButton 
                        style={styles.btn}
                        onPress={closeHeader}
                    >
                        <Icon 
                            name={'arrowleft'}
                            family={'AntDesign'} 
                            color="#707070"
                            size={22}
                        />
                    </BaseButton>
                )}
                
                {(!(search === "") || isFocused) && (
                    <View style={styles.containerInput}>
                        <View style={styles.autoCompleteInput}>
                            <AutoComplete
                                data={data} 
                                defaultValue={search}
                                onChangeText={handleInput}
                                ref={inputRef}
                                renderItem={renderLecture}
                                onFocus={openHeader}
                                keyExtractor={extractor}
                                onBlur={closeHeader}
                                inputContainerStyle={styles.autoCompleteContainer}
                                listContainerStyle={styles.autoCompleteListContainer}
                                listStyle={styles.autoCompleteList}
                                containerStyle={styles.containerAutoComplete}
                            />  
                        </View>                         
                        {!(search === "") && (
                            <BaseButton 
                                style={styles.roundButton}
                                onPress={clearInput}
                            >
                                <Icon 
                                    name="close"
                                    family="AntDesign" 
                                    color="#707070"
                                    size={18}
                                />
                            </BaseButton>
                        )}                        
                    </View>                
                )}
                <View style={styles.row}>
                    {!isFocused && (                            
                        <BaseButton 
                            style={styles.btn}
                            onPress={search === "" ? openHeader : handleFilter}
                        >
                            <Icon 
                                name={search === "" ? 'search' : 'filter'}
                                family="Feather" 
                                color="#707070"
                                size={22} 
                            />
                        </BaseButton>
                    )}                
                </View>
            </View>                       
        </View>                        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        height: 50,
        marginTop: StatusBar.currentHeight
    }, 
    row: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100%"
    }, 
    containerAutoComplete: {
        zIndex: 1000
    },
    autoCompleteContainer: {
        flex: 1,
        flexDirection: "row",
        width: width - 90,
        borderWidth: 0,
        backgroundColor: "#fff",
        paddingHorizontal: 5
    },
    autoCompleteListContainer: {
        height,
        width,
        backgroundColor: "#e3e3e3",
        position: "absolute",
        left: 0,
        marginLeft: -72,
        top: 45,
        zIndex: 1000
    },
    autoCompleteList: {
        width: "100%"
    },
    roundButton: {
        borderRadius: 20,
        marginRight: 15
    },
    btn: {
        padding: 20
    },
    containerInput: {
        flex: 1,
        height: 35,
        backgroundColor: "#e3e3e3",
        flexDirection: "row",
        alignItems: "center",
    },
    autoCompleteInput: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 100
    },    
    searchInput: {
       flex: 1,
       color: "#707070",
       paddingLeft: 10,
       position: "relative",
       width: "100%",
    },
    sugestions: {
        
    }    
})

export default connect(null, null)(SearchHeader);

/**
 * 
 * {isFocused && (
                <View style={styles.sugestions}>
                    <FlatList 
                        data={Lectures}
                        contentContainerStyle={styles.list}
                        renderItem={renderLecture}
                        keyExtractor={(item, index) => index}
                        onRend
                        
                    />
                </View>
            )}
 */