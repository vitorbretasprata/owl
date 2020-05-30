import React, { useRef, useReducer, useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,         
} from "react-native";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { FlatList, ScrollView, BaseButton, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import YearsModal from "../components/modal";
import Loading from "../../components/loading";
import InputMask from "../../../components/inputMask";
import { SetAccountInfo } from "../../../services/Account/action";
import { lecturesInfos } from "../constants/constants"; 

const { Value, interpolate } = Animated;

const WidthScreen = Dimensions.get("screen").width - 80;
const position = new Value(0.33);

const initInfo = {
    classes: {
        "Matemática": [],
        "Português": [],
        "Química": [],
        "Biologia": [],
        "Física": [],
        "Ciências": [],
        "Inglês": [],
        "Espanhol": [],
        "Geografia": [],
        "História": [],
        "Ensino Religioso": []     
    },
    lectureTime: null,
    lectureValue: null,
    movementValue: null,
}

function ConfigTeacher({ SetAccountInfo }) {
    
    const scrollRef = useRef(null);
    let index = 0;
    const transPosition = withTransition(position);

    const [showModal, setShowModal] = useState(false);
    const [lectureSelected, setLectureSelected] = useState([]);

    const [Info, dispatch] = useReducer((state, action) => {
        switch(action.type){
            case "ADD_CLASS":
                return {
                    ...state,
                    classes: {
                        ...state.classes,
                        [action.payload.className]: action.payload.selectedClasses
                    }
                }
            case "SET_LECTURE_TIME":
                return {
                    ...state,
                    lectureTime: action.payload
                }
            case "SET_LECTURE_VALUE":
                return {
                    ...state,
                    lectureValue: action.payload,
                }
            case "SET_MOVEMENT_VALUE":
                return {
                    ...state,
                    movementValue: action.payload
                }
            case "SET_LOADING":
                return {
                    ...state,
                    loading: !state.loading
                }
            default: 
                return state;
        }
    }, initInfo);  
    
    useEffect(() => {
        
        return () => {
            position.setValue(0.33);
        }
    }, []);    

    const submitInfo = () => {
        switch(index) {
            case 0:
                handleScroll();
                break;
            case 1: 
                handleScroll();
                break;
            case 2: 
                SetAccountInfo(Info);
                break;            
            default: 
                break; 
        }
    }

    const decrement = () => {        
        if(0 <= index && 0 <= position._value) {
            index--;
            const aux = index / 3 ;
            position.setValue(aux);
        }
    }

    const handleChangeText = (name, value) => {
        dispatch({
            type: lecturesInfos[name],
            playload: value
        })
    }

    const increment = () => {
        if(index <= 3 && position._value <= 0.99) {
            index++;
            const aux = (index + 1) / 3;
            position.setValue(aux);
        }        
    }

    const handleScroll = () => {
        if(scrollRef.current.scrollTo) {
            increment();            
            scrollRef.current.scrollTo({
                animated: true,
                x: WidthScreen * index,
                y: 0
            });
        }
    }

    const handleModal = item => {
        const lecture = {
            className: item,
            selectedClasses: Info.classes[item]
        }
        setLectureSelected(lecture);
        setShowModal(true);
    }

    const close = () => setShowModal(false);

    const handleSaveYears = (years, lecture) => {
        dispatch({
            type:"ADD_CLASS",
            payload: { 
                className: lecture,
                selectedClasses: years
            }
        });
    }

    return (
        <Background>
            <Loading />
            <YearsModal 
                showModal={showModal}
                closeModal={close}
                lecture={lectureSelected}
                saveSelectedYears={(years, lecture) => handleSaveYears(years, lecture)}
            />
            <View style={styles.container}>
                <ProgressBar progressWidth={interpolate(transPosition, {
                    inputRange: [0.34, 0.67, 1],
                    outputRange: [75, 135, 200]
                })}/>
                <ScrollView
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollWidth}
                >
                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Especialidades</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Adicione as matérias que você deseja lecionar
                        </Text>
                        <View style={styles.scrollWidth}>
                            <FlatList 
                                data={Object.keys(Info.classes)}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ marginTop: 120 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableWithoutFeedback
                                        style={styles.lecture}
                                        onPress={() => handleModal(item)}
                                    >
                                        <Text style={styles.white}>
                                            {item}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />                            
                        </View>                        
                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o tempo de sua aula (em minutos)
                        </Text>
                        <InputMask
                            placeholder="0 minutos"
                            currentValue={Info.lectureTime}
                            name="lectureTime"
                            updateMasterState={handleChangeText}
                        />                      

                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o valor de cada aula
                        </Text>
                        <View style={styles.addChild}>
                            <InputMask 
                                type={'money'}
                                placeholder="R$ 0,00"
                                currentValue={Info.lectureValue}
                                name="lectureValue"
                                maskOptions={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                updateMasterState={handleChangeText}
                            />                            
                        </View> 
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe uma taxa de deslocamento
                        </Text> 
                        <View style={styles.addChild}>
                            <InputMask 
                                type={'money'}
                                placeholder="R$ 0,00"
                                currentValue={Info.movementValue}
                                name="movementValue"
                                maskOptions={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                updateMasterState={handleChangeText}
                            />                            
                        </View>                      
                    </View>
                                        
                </ScrollView>
                
                <BaseButton
                    style={styles.button}
                    onPress={submitInfo}
                >
                    <View accessible>
                        <Text style={styles.textColor}>{index >= 2 ? "Concluir" : "Próximo"}</Text>
                    </View>
                </BaseButton>                    
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center"
   },
   scrollWidth: {
        width: WidthScreen
   },
   button: {
        width: "100%",
        backgroundColor: "#F58738",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        height: 50
   },
   lecture: {
        width: "100%",
        borderColor: "#fff",
        borderWidth: 2,
        justifyContent: "center",
        paddingHorizontal: 15,
        alignItems: "flex-start",
        borderRadius: 20,
        height: 45,
        marginVertical: 5
   },
   addChild: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        width: "100%"
   },
   input: {
        borderColor: "#fff",
        color: "#fff"
   },
   textColor: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10
   },
   white: {
       color: "#fff"
   },
   textTitle: {
        fontSize: 35
   },
   textDesc: {
        fontSize: 15
   }
});

export default connect(null, { SetAccountInfo })(ConfigTeacher);