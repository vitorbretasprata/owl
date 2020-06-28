import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar, TextInput } from "react-native";
import { connect } from "react-redux";
import { BaseButton, FlatList } from "react-native-gesture-handler";
import { Icon } from "galio-framework";

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

    const handleInput = (text) => {
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

    const renderLecture = ({ item, index }) => <LectureItem item={item} index={index} condition={index === (Lectures.length - 1)} chooseLecture={choose} />

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
                        <TextInput 
                            style={styles.searchInput}
                            value={search}
                            onChangeText={handleInput}
                            ref={inputRef}
                            onFocus={openHeader}
                            onBlur={closeHeader}
                        />   
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
            {isFocused && (
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
        flexDirection: "row"
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
    searchInput: {
       flex: 1,
       color: "#707070",
       paddingLeft: 10
    },
    sugestions: {
        height,
        width,
        backgroundColor: "#e3e3e3" 
    }    
})

export default connect(null, null)(SearchHeader);