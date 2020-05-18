import React, { useRef } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView 
} from "react-native";
import { Button } from "galio-framework";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";

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

function Account(props) {

    const scrollRef = useRef(null);
    const clock = new Clock()
    const Width = runTiming(clock, 0, 20);

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

                </ScrollView>
                <Text style={[styles.textColor, styles.textTitle]}>Bem Vindo</Text>
                <Text style={[styles.textColor, styles.textDesc]}>
                    Antes de começarmos, precisamos 
                    que você configure sua conta.
                </Text>
                <Text style={[styles.textColor, styles.textDesc]}>
                    Selecione o tipo de conta que deseja criar:
                </Text>

                <View>
                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Responsável
                        </Button>
                    </View>

                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Aluno
                        </Button>
                    </View>

                    <View>
                        <Button 
                            color="#F58738"
                            round 
                            uppercase
                        >
                            Professor
                        </Button>
                    </View>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       borderWidth: 1,
       borderColor: "#000"
   },
   scrollWidth: {
        width: 300,
        borderWidth: 2,
        borderColor: "#000"
   },
   textColor: {
        color: "#fff",
        textAlign: "center",
        marginVertical: 10
   },
   textTitle: {
        fontSize: 40
   },
   textDesc: {
        fontSize: 20
   }
});

export default connect(null, { SetType })(Account);