import React, { useRef } from "react";
import { 
    View, 
    Text, 
    StyleSheet,     
} from "react-native";
import { Button, Input } from "galio-framework";
import { connect } from "react-redux";
import Animated, { Easing } from "react-native-reanimated";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import { SetType } from "../../../services/User/action";

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

function ConfigTeacher(props) {

    const scrollRef = useRef(null);
    const dependenteRef = useRef(null);

    const clock = new Clock();
    const Width = runTiming(clock, 0, 0);

    return (
        <Background>
            <View style={styles.container}>
                <ProgressBar progressWidth={Width}/>
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
                                ref={dependenteRef}
                                style={styles.input}
                            />
                            <Button 
                                onlyIcon 
                                icon="plus" 
                                iconFamily="antdesign" 
                                iconSize={30} 
                                color="#F58738" 
                                iconColor="#fff" 
                                style={{ width: 40, height: 40 }}
                            >PLUS</Button>
                        </View>
                        <View>

                        </View>
                    </View>

                    <View style={[styles.scrollWidth, styles.page]}>
                        <Text style={[styles.textColor, styles.textTitle]}>Dependentes</Text>
                        <Text style={[styles.textColor, styles.textDesc]}>
                            Adicione pelo menos um dependente:
                        </Text>
                        <View style={styles.addChild}>
                            
                        </View>
                        

                    </View>
                </ScrollView>  

                <Button 
                    color="#F58738"
                    round
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
        width: 300
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

export default connect(null, { SetType })(ConfigTeacher);