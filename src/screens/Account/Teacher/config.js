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
import { TextInputMask } from 'react-native-masked-text';
import { FlatList, ScrollView, BaseButton, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import YearsModal from "../components/modal";
import Loading from "../../../components/loading";
import { SetAccountInfo } from "../../../services/Account/action";
import LectureItem from "./components/lectureItem";

const { Value, interpolate } = Animated;

const WidthScreen = Dimensions.get("screen").width - 80;
const position = new Value(0.33);
let index = 0;
const transPosition = withTransition(position);

const positionTrans = interpolate(transPosition, {
    inputRange: [0.34, 0.67, 1],
    outputRange: [75, 135, 200]
});

const emptyClasses = {    
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
    "Francês": []
}

function ConfigTeacher({ SetAccountInfo, loading }) {
    
    const scrollRef = useRef(null);


    const [showModal, setShowModal] = useState(false);
    const [lectureSelected, setLectureSelected] = useState({});
    const [lectureTime, setLectureTime] = useState("");
    const [lectureValue, setLectureValue] = useState("");
    const [movementValue, setMovementValue] = useState("");

    const [selectedClasses, dispatch] = useReducer((state, action) => {
        return {
            ...state,            
            [action.className]: action.selectedClasses
        }
    }, emptyClasses);  
    
    useEffect(() => {       
        return () => {
            position.setValue(0.33);
            index = 0;
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
                const type = 3;
                const Info = {
                    days: [],
                    lectures: selectedClasses,
                    lectureTime,
                    lectureValue,
                    movementValue
                }
                SetAccountInfo(type, Info);
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

    const handleLectureTime = text => setLectureTime(text);
    const handleLectureValue = text => setLectureValue(text);
    const handleMovementValue = text => setMovementValue(text);

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
            selectedClasses: selectedClasses[item]
        }
        setLectureSelected(lecture);
        setShowModal(true);
    }

    const close = () => setShowModal(false);

    const handleSaveYears = (years, lecture) => {
        dispatch({
            className: lecture,
            selectedClasses: years
        });        
    }

    return (
        <Background>
            <Loading loading={loading} />
            <YearsModal 
                showModal={showModal}
                closeModal={close}
                lecture={lectureSelected}
                saveSelectedYears={handleSaveYears}
            />
            <View style={styles.container}>
                <ProgressBar progressWidth={positionTrans}/>
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
                                data={Object.keys(selectedClasses)}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ marginTop: 120 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => 
                                    <LectureItem 
                                        arrayLength={selectedClasses[item].length} 
                                        handleClickModal={handleModal} 
                                        itemName={item}
                                    />                                    
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />                            
                        </View>                        
                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o tempo de sua aula (em minutos)
                        </Text>
                        <TextInputMask 
                            style={styles.input}
                            type={'custom'}
                            placeholder="em minutos"
                            keyboardType="numeric"
                            options={{
                                mask: "999"
                            }}
                            value={lectureTime}
                            onChangeText={handleLectureTime}                            
                        />               

                    </View>

                    <View style={styles.scrollWidth}>
                        <Text style={[styles.textColor, styles.textTitle]}>Aulas</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informa o valor de cada aula
                        </Text>
                        <View style={styles.addChild}>
                            <TextInputMask 
                                style={styles.input}
                                type={'money'}
                                keyboardType="decimal-pad"
                                placeholder="R$ 0,00"
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={lectureValue}
                                onChangeText={handleLectureValue}                            
                            />                            
                        </View> 
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Informe uma taxa de deslocamento
                        </Text> 
                        <View style={styles.addChild}>
                            <TextInputMask 
                                style={styles.input}
                                type={'money'}
                                keyboardType="decimal-pad"
                                placeholder="R$ 0,00"
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={movementValue}
                                onChangeText={handleMovementValue}                                                        
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
       alignItems: "center",
       justifyContent: "space-between",
       paddingVertical: 35
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
   addChild: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        width: "100%"
   },
   input: {
        borderColor: "#fff",
        color: "#707070",
        height: 40,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15
        
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

const mapStateToProps = state => {
    return {
        loading: state.account.loading
    }
}

export default connect(mapStateToProps, { SetAccountInfo })(ConfigTeacher);