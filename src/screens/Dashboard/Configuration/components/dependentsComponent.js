import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Text, Icon } from "galio-framework";
import { connect } from "react-redux";

import DependentItem from "./dependentItem";
import DependentModal from "./modals/dependentModal";
import OptionsDependentModal from "../../components/modal";

import { setDependents } from "../../../../services/Account/action";

function dependentComponent({ dependents, setDependents }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [showOptionsModal, setshowOptionsModal] = useState(false);

    const showDependentOptions = index => {
        setSelectedItem(index);
        setShowModal(true);
    }

    const close = () => {
        setShowModal(false);
    }

    const closeOptions = () => {
        setshowOptionsModal(false);
    }

    const removeDependent = () => {
        close();
        const depArr = dependents.splice(selectedItem, 1);
        setDependents(depArr);
    }
    
    const handleSave = name => setDependents(name);

    return (
        <SafeAreaView style={styles.container}>
            <DependentModal 
                showModal={showModal}
                closeModal={close}
                addDependent={handleSave}
            />
            <OptionsDependentModal 
                showModal={showOptionsModal}
                closeModal={closeOptions}  
                deleteSelected={removeDependent}                              
            />
            <View style={styles.section}>                               
                    
                <View style={[styles.sectionTitle, styles.editButtons]}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>
                            Formas de pagamento
                        </Text>

                    </View>

                    <View style={styles.alignIcons}>
                        <TouchableWithoutFeedback
                            onPress={editMode}
                        >
                            <Icon 
                                family="AntDesign"
                                name="edit"
                                color="#F58738"
                                size={25}
                            />
                        </TouchableWithoutFeedback>
                    </View>  

                    <View style={styles.dependentsList}>
                        {dependents.length === 0 ? (
                            <Text style={styles.emptyList}>
                                Você não tem dependentes cadastrados.
                            </Text>
                        ) : (
                            dependents.map((dependent, index) => 
                                <DependentItem 
                                    dependent={dependent} 
                                    index={index} 
                                    showDependentOptions={showDependentOptions}
                                />
                            )
                        )}
                    </View>                          
                </View>                
            </View>            
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    section: {
        paddingTop: 30,
        paddingBottom: 25
    },
    sectionTitle: {
        paddingHorizontal: 30             
    },
    editButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        color: "#707070"
    },   
});

const mapStateToProps = state => {
    return {
        dependents: state.account.extraInfo.dependents
    }
}

export default connect(mapStateToProps, { setDependents })(dependentComponent);