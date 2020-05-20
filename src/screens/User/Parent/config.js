import React, { useState, useRef } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions    
} from "react-native";
import { Button, Input } from "galio-framework";
import { connect } from "react-redux";
import Animated, { Easing } from "react-native-reanimated";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import ListRow from "./components/listRow";
import { SetType } from "../../../services/User/action";
import Picture from "../components/picture";

const { 
    Value,
    Clock,
    cond,
    set,
    timing,
    startClock,
    stopClock,
    interpolate,
    Extrapolate,
    block,
    neq,
    eq,
    and,
    clockRunning,
    useCode
  } = Animated;



const WidthScreen = Dimensions.get("screen").width - 80;

function ConfigParent(props) {

    const runTiming = (clock, current, target) => {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0),
        };
        
        const config = {
            duration: 400,
            toValue: new Value(-1),
            easing: Easing.inOut(Easing.ease),
        };
    
        return block([
            cond(clockRunning(clock), [
                set(config.toValue, target)
            ],
            [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, current),
                set(state.frameTime, 0),
                set(config.toValue, target),
                startClock(clock),
            ]),
            timing(clock, state, config),
            cond(state.finished, stopClock(clock)),
            state.position
        ]);
    }

    const scrollRef = useRef(null);
    let index = 0;
    const position = new Value(0);
    const dest = new Value(0.5);

    const [dependents, setDependents] = useState(["Vitor", "Vitor", "Vitor", "Vitor"]);
    const [dependentInput, setDependentInput] = useState("");

    const clock = new Clock();
    const anim = runTiming(clock, position, dest);


    const handleAdd = () => {
        if(dependentInput !== "" && !dependentInput.match("\\d+")) {
            setDependents([...dependents, dependentInput]);
            setDependentInput("");
        }        
    }

    const handleKeyPress = event => {
        if(event.key === "Enter") {
            setDependents([...dependents, dependentInput]);
            setDependentInput("");
        }
    }

    const handleChange = text => setDependentInput(text);

    const handleRemove = index => {
        console.log(dependents)
    };

    const handleNext = () => {
        index++;
        position.setValue(0.5)
        dest.setValue(1);
        handleScroll(index);
    }

    const handlePrevious = () => {
        index--;
        handleScroll(index);
    }

    const handleScroll = index => {
        if(scrollRef.current && scrollRef.current.scrollTo) {
            scrollRef.current.scrollTo({
                animated: true,
                x: WidthScreen * index,
                y: 0
            });
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <ProgressBar progressWidth={
                    interpolate(anim, {
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 100, 200],
                        extrapolate: Extrapolate.CLAMP
                })}/>
                <ScrollView
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    ref={scrollRef}
                    style={styles.scrollWidth}
                >
                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Dependentes</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Adicione pelo menos um dependente:
                        </Text>
                        <View style={styles.addChild}>
                            <Input 
                                placeholder="Dependente" 
                                left
                                icon="user"
                                family="antdesign"
                                rounded 
                                onChangeText={handleChange}
                                style={styles.input}
                                onKeyPress={handleKeyPress}
                                value={dependentInput}
                            />
                            <Button 
                                onlyIcon 
                                icon="plus" 
                                iconFamily="antdesign" 
                                iconSize={30} 
                                color="#F58738" 
                                iconColor="#fff" 
                                onPress={handleAdd}
                                style={{ width: 40, height: 40 }}
                            >PLUS</Button>
                        </View>
                        <View>
                            <FlatList 
                                style={{ marginTop: 20 }}
                                data={dependents}
                                renderItem={({ item, index }) => (
                                  <ListRow
                                    name={item}
                                    index={index}
                                    onRemove={() => handleRemove(index)}
                                  />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Foto de perfil</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Escolha uma foto de perfil
                        </Text>
                        <Picture />
                        

                    </View>
                </ScrollView>  

                <Button 
                    color="#F58738"
                    round
                    onPress={handleNext}
                >
                    Próximo
                </Button>           

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
   page: {

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
   textTitle: {
        fontSize: 35
   },
   textDesc: {
        fontSize: 15
   }
});

export default connect(null, { SetType })(ConfigParent);