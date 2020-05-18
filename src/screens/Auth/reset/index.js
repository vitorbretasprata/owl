import React, { useState, useRef, useReducer } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  ScrollView
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon, theme, Button } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

import Loading from "../components/loading";
import BackgroundImage from "../components/backgroundImage";
import AuthInput from "../components/input";
import Toast from "../components/toast";

import { Reset } from "../../../services/Auth/action";
import { checkEmail } from "../../../services/Api/AuthApi";

const scrollWidth = Dimensions.get("screen").width - 80;

function Forgot(props) {

    const { navigation, error } = props;
    const scrollRef = useRef(null);
    let index = 0;

    const [values, setValues] = useState({
        email: "",
        code: "",
        password: "",
        repeat: ""
    });

    const [savedCode, setSavedCode] = useState("");

    const [loading, dispatch] = useReducer((state, action) => {
        return !state;
    }, false);


    const _handleChange = (attrName, value) => {
        setValues({
            ...values,
            [attrName]: value
        });
    }  

    const handleScroll = index => {
        if(scrollRef.current && scrollRef.current.scrollTo) {
            scrollRef.current.scrollTo({
                animated: true,
                x: scrollWidth * index,
                y: 0
            });
        }
        dispatch();
    }

    const _checkEmail = index => {
        checkEmail()
            .then(data => {
                setSavedCode(data)
                handleScroll(index);
            }).catch(error => {

            })
    }

    const _checkCode = index => {
        if(savedCode.toString() === values["code"]) {
            handleScroll(index);
        } else {

        }
    }

    const _handleStage = () => {
        dispatch();
        index++;
        switch(index) {
            case 1: 
                _checkEmail(index);
                break;
            case 2: 
                _checkCode(index);
                break;   
            case 3:
                Reset(values); 
                break;
            default: 
                break; 
        }
    }   

    return (
        <BackgroundImage>
            <Loading />
            <SafeAreaView style={styles.container}>                
                
                <View style={styles.align}>
                    <ScrollView
                        horizontal
                        scrollEnabled={false}
                        pagingEnabled
                        ref={scrollRef}
                        style={styles.scrollWidth}
                    >
                        <View style={styles.scrollWidth}>
                            <Text style={styles.alignText}>
                                Informe endereço de email que você cadastrou, 
                                será enviado um código para a alteração de senha.
                            </Text>
                            <AuthInput 
                                placeholder="Email"
                                attrName="email"
                                value={values["email"]}
                                updateMasterState={_handleChange}
                                icon="mail"
                                family="AntDesign"
                            />
                        </View>

                        <View style={styles.scrollWidth}>
                            <Text style={styles.alignText}>
                                Informe o código
                            </Text>
                            <AuthInput 
                                placeholder="Código"
                                attrName="code"
                                value={values["code"]}
                                updateMasterState={_handleChange}
                                icon="mail"
                                family="AntDesign"
                            />
                        </View>

                        <View style={styles.scrollWidth}>
                            <Text style={styles.alignText}>
                                Digite uma nova senha
                            </Text>
                            <AuthInput 
                                placeholder="Senha"
                                attrName="password"
                                value={values["password"]}
                                updateMasterState={_handleChange}
                                icon="lock"
                                family="AntDesign"
                            />

                            <AuthInput 
                                placeholder="Confirmar senha"
                                attrName="confirm"
                                value={values["repeat"]}
                                updateMasterState={_handleChange}
                                icon="lock"
                                family="AntDesign"
                            />
                        </View>
                        
                    </ScrollView>                   
                    <Button
                        onPress={_handleStage}
                        color="#F58738"
                        round 
                        uppercase
                        style={styles.submit}
                        loading={loading}
                    >
                        {index < 2 ? "Próximo" : "Enviar"}
                    </Button>
                </View>

                <View style={styles.other}>                   

                    <LinearGradient
                        colors={["#F58738", "#F8B586"]}
                        start={[0.5, 0.7]}
                        style={[styles.goBack, { elevation: 3 }]}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => navigation.goBack()} 
                            style={styles.touchable}               
                        >
                            <Icon name="left" family="AntDesign" color={theme.COLORS.WHITE} size={35} />
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                </View> 

                <Toast ErrorMessage={"Este é u error"}/>     
            </SafeAreaView>
        </BackgroundImage>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",    
        borderRadius: 10,
        justifyContent: "space-between",
        paddingVertical: 20
    },
    submit: {
        width: "100%",     
        marginTop: 15
    },
    align: {    
        paddingHorizontal: 30,
    },  
    other: {
        paddingHorizontal: 30,
        alignItems: "center",
    },
    touchable: {
        width: 50,
        height: 50,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 5
    },
    scrollWidth: {
        width: scrollWidth,    
    },  
    goBack: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginVertical: 20
    },  
    alignText: {
        textAlign: "center",
        marginBottom: 20
    }
});


const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps, { Reset })(Forgot);