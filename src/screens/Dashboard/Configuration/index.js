import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text, Icon } from "galio-framework";
import { RectButton, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Modal from "../components/modal";
import DependentsComponent from "./components/dependentsComponent";
import PaymentModal from "./components/modals/paymentModal";
import LectureComponents from "./components/lecturesComponents";
import { setPaymentMethods } from "../../../services/Account/action";

const paymentMethod = [1, 2, 3, 4, 5];

function Configuration({ getInfoAccount, type, setPaymentMethods, extraInfo }) {

    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleLong = () => setShowModal(true);
    const close = () => setShowModal(false);

    const handlePaymentModal = () => setShowPaymentModal(true);
    const closePaymentModal = () => setShowPaymentModal(false);

    const handleItemMethod = (item, index) => (
        <RectButton
            key={index.toString()}
            onPress={handleLong}
        >
            <View style={styles.option}>
                <Icon 
                    family="AntDesign"
                    name="creditcard" 
                    size={25}
                    color="#707070"
                />
                <Text style={styles.optionText}>
                    Cartão
                </Text>                            
            </View>  
        </RectButton> 
    );

    const delItem = () => {

    }

    return (
        <ScrollView style={styles.container}>
            <Modal 
                showModal={showModal}
                closeModal={close}
                selectedItem={1}
                deleteSelected={delItem}
            />
            <PaymentModal 
                showModal={showPaymentModal}
                closeModal={closePaymentModal}
            />
            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>
                        Formas de pagamento
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={handlePaymentModal}
                    >
                        <Icon 
                            family="AntDesign"
                            name="plus"
                            color="#F58738"
                            size={25}
                        />
                    </TouchableWithoutFeedback>                    
                </View>
                
                <View style={styles.options}>
                    <RectButton
                        onPress={handleLong}
                    >
                        <View style={styles.option}>
                            <Icon 
                                family="MaterialIcons"
                                name="attach-money" 
                                size={25}
                                color="#707070"
                            />
                            <Text style={styles.optionText}>
                                Dinheiro
                            </Text>                            
                        </View>  
                    </RectButton>                                         
                </View>

                {paymentMethod.map((item, index) => handleItemMethod(item, index))}                

                <View style={styles.separator} />            
                {type === 3 && <LectureComponents lectures={extraInfo.lectures} days={extraInfo.days} />}

                {type === 1 && <DependentsComponent dependents={extraInfo.dependents} />}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1        
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
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between"            
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
        type: state.account.type,
        loading: state.account.loading,
        extraInfo: state.account.extraInfo
    }
}

export default connect(MapStateToProps, { setPaymentMethods })(Configuration);