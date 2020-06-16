import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { RectButton, FlatList } from "react-native-gesture-handler";

import Modal from "./modals/dependentModal";
const dependents = [1, 2, 3, 4, 5];

function DependentsComponent() {

    const [showModal, setShowModal] = useState(false);

    const handleLong = () => {
        setShowModal(true);
    }

    const close = () => {
        setShowModal(false);
    }

    const handleItemMethod = ({ item, index }) => (
        <RectButton
            onPress={handleLong}
        >
            <View style={styles.option}>
                <Icon 
                    family="AntDesign"
                    name="user" 
                    size={25}
                    color="#707070"
                />
                <Text style={styles.optionText}>
                    `Dependente ${index}`
                </Text>                            
            </View>  
        </RectButton> 
    );

    const delItem = () => {

    }
    
    const handleSave = name => setDependents(name);
    const handleKey = (index) => index.toString(); 

    return (
        <SafeAreaView style={styles.container}>
            <Modal 
                showModal={showModal}
                closeModal={close}
                selectedItem={1}
            />
            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>
                        Formas de pagamento
                    </Text>

                </View>               
                    
                <FlatList 
                    data={dependents}
                    renderItem={handleDependents}
                    keyExtractor={handleKey}
                />

                <View style={styles.separator} />            
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    section: {
        paddingTop: 30,
        paddingBottom: 25
    },
    options: {
        paddingTop: 10
    },
    option: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    optionText: {
        color: "#707070",
        fontSize: 18,
        marginLeft: 10
    },
    sectionTitle: {
        paddingHorizontal: 30             
    },
    title: {
        fontSize: 20,
        color: "#707070"
    },
    separator: {
        height: 1,
        backgroundColor: "#e3e3e3"
    }
});

const MapStateToProps = state => {
    return {        
        type: state.account.type
    }
}

export default connect(MapStateToProps, null)(DependentsComponent);