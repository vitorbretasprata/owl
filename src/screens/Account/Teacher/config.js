import React, { useRef, useReducer, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Modal     
} from "react-native";
import { Input } from "galio-framework";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { FlatList, ScrollView, BaseButton, State, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import YearsModal from "../components/modal";
import { SetAccountInfo } from "../../../services/Account/action";

const { 
    Value,
    cond,
    set,
    timing,
    interpolate,
    Extrapolate,
    block,
    neq,
    eq,
    and,
    useCode
  } = Animated;

const WidthScreen = Dimensions.get("screen").width - 80;
const position = new Value(0);

const classes = [
    { 
        className: "Matemática",
        selectedClasses: []
    },
    { 
        className: "Português",
        selectedClasses: []
    },    
    { 
        className: "Química",
        selectedClasses: []
    },
    { 
        className: "Biologia",
        selectedClasses: []
    },
    { 
        className: "Física",
        selectedClasses: []
    },
    { 
        className: "Ciências",
        selectedClasses: []
    },
    { 
        className: "Inglês",
        selectedClasses: []
    },
    { 
        className: "Espanhol",
        selectedClasses: []
    },
    { 
        className: "Geografia",
        selectedClasses: []
    },
    { 
        className: "História",
        selectedClasses: []
    },
    { 
        className: "Ensino Religioso",
        selectedClasses: []
    }        
];


const initInfo = {
    classes: [],
    lectureTime: null,
    lectureValue: null,
    movementValue: null,
    url: null
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
                        [action.payload.className]: action.payload.classContent
                    }
                }
            case "SET_LECTURE_TIME":
                return {
                    ...state,
                    lectureTime: action.payload.lectureTime
                }
            case "SET_LECTURE_VALUE":
                return {
                    ...state,
                    lectureValue: action.payload.lectureValue
                }            
            case "SET_MOVEMENT_VALUE":
                return {
                    ...state,
                    movementValue: action.payload.movementValue
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

    const submitInfo = () => {
        switch(index) {
            case 0:
                dispatch({
                    type: 'SET_DEPENDENTS'
                });
                handleScroll();
                break;
            case 1: 
                handleScroll();
                break;
            case 2: 
                handleScroll();
                break;
            case 3:                 
                SetAccountInfo(Info);
                break;
            default: 
                break; 
        }
    }

    const decrement = () => {        
        if(0 <= index && 0 <= position._value) {
            index--;
            const aux = index / 4 ;
            position.setValue(aux);
        }
    }

    const increment = () => {
        if(index <= 4 && position._value <= 1) {
            index++;
            const aux = index / 4 ;
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

    const handleModal = lecture => {
        setLectureSelected(lecture);
        setShowModal(true);
    }

    const close = () => setShowModal(false);

    return (
        <Background>
            <YearsModal 
                showModal={showModal}
                closeModal={close}
                lecture={lectureSelected}
            />
            <View style={styles.container}>
                <ProgressBar progressWidth={interpolate(transPosition, {
                    inputRange: [0, 0.25, 0.5, 0.75, 1],
                    outputRange: [0, 50, 100, 150, 200]
                })}/>
                <ScrollView
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    ref={scrollRef}
                    style={styles.scrollWidth}
                >
                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Especialidades</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Adicione as matérias que você deseja lecionar
                        </Text>
                        <View style={styles.scrollWidth}>
                            <FlatList 
                                data={classes}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ marginTop: 120 }}
                                renderItem={({ item }) => (
                                    <TouchableWithoutFeedback
                                        style={styles.lecture}
                                        onPress={() => handleModal(item)}
                                    >
                                        <Text style={styles.white}>
                                            {item.className}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />                            
                        </View>                        
                    </View>

                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o tempo de sua aula (em minutos)
                        </Text>
                        <Input 
                            placeholder="Aulas" 
                            left
                            keyboardType="number-pad"
                            icon="user"
                            family="antdesign"
                            rounded 
                            style={styles.input}
                        />                      

                    </View>

                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o valor de cada aula
                        </Text>
                        <View style={styles.addChild}>
                            <Input 
                                placeholder="R$ 0,00" 
                                left
                                keyboardType="decimal-pad"
                                icon="attach-money"
                                family="MaterialIcons"
                                rounded 
                                style={styles.input}
                            />                            
                        </View>                        
                    </View>

                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aula</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe uma taxa de deslocamento
                        </Text>
                        <View style={styles.addChild}>
                            <Input 
                                placeholder="R$ 0,00" 
                                left
                                keyboardType="decimal-pad"
                                icon="attach-money"
                                family="MaterialIcons"
                                rounded 
                                style={styles.input}
                            />                            
                        </View>
                    </View>                    
                </ScrollView>
                
                <BaseButton
                    style={styles.button}
                    onPress={submitInfo}
                >
                    <View accessible>
                        <Text style={styles.textColor}>{index >= 3 ? "Concluir" : "Próximo"}</Text>
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
        paddingHorizontal: 10
   },
   input: {
        borderColor: "#fff",
        color: "#fff",
        width: 200
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