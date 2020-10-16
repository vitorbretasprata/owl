import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar, TextInput } from "react-native";
import { connect } from "react-redux";
import { BaseButton } from "react-native-gesture-handler";
import { Icon } from "galio-framework";

const { width, height } = Dimensions.get("screen");

function SearchHeader({ filterValue, handleFilter, handleFocusHeader }) {

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if(isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    const closeHeader = () => {
        if(isFocused) {
            inputRef.current.blur();
            handleFocusHeader(false);
            setIsFocused(false);
            return;
        } else {
            setSearch("");
        }
    }
    
    const openHeader = () => {
        setIsFocused(true);
        handleFocusHeader(true);
    }

    const clearInput = () => setSearch("");

    return (
        <>
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
                            <TextInput
                                value={filterValue}
                                style={styles.autoCompleteContainer}
                                onChangeText={handleFilter}
                                ref={inputRef}
                                onFocus={openHeader}
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
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
        backgroundColor: "#000",
        position: "absolute",
        left: 0,
        marginLeft: -72,
        top: 45,
    },
    autoCompleteList: {
        width: "100%",
        backgroundColor: "#aaa",
        zIndex: 10000
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
        width: 100,
        zIndex: 1
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