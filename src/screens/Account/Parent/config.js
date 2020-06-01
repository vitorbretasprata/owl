import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions    
} from "react-native";
import { Button, Input } from "galio-framework";
import { connect } from "react-redux";
import { 
    Value,
    interpolate,
    Extrapolate,
    eq,
    not,
    useCode
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import { withTransition } from "react-native-redash";

import Background from "../components/background";
import ProgressBar from "../components/progressBar";
import ListRow from "./components/listRow";
import { SetAccountInfo } from "../../../services/Account/action";
import Loading from "../../../components/loading";

const WidthScreen = Dimensions.get("screen").width - 80;
const position = new Value(0);

function ConfigParent({ SetAccountInfo }) { 
    
    const transPosition = withTransition(position);  

    const [dependents, setDependents] = useState([]);
    const [dependentInput, setDependentInput] = useState("");

    const handleAdd = () => {
        if(dependentInput !== "" && !dependentInput.match("\\d+")) {
            setDependents([...dependents, dependentInput]);
            setDependentInput("");
        }        
    }    

    const handleChange = text => setDependentInput(text);

    const handleRemove = index => {
        const first = dependents.slice(0, index);
        const second = dependents.slice(index + 1);

        setDependents(first.concat(second));
    };

    const submitInfo = () => {
        position.setValue(1);
        SetAccountInfo({
            type: 1,
            dependents
        });
    }   

    return (
        <Background>
            <Loading />
            <View style={styles.container}>
                <ProgressBar progressWidth={
                    interpolate(transPosition, {
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                        extrapolate: Extrapolate.CLAMP
                })}/>
                
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
                            returnKeyType="go"
                            onSubmitEditing={handleAdd}
                            onChangeText={handleChange}
                            style={styles.input}
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
                
                <Button 
                    color="#F58738"
                    round
                    onPress={submitInfo}
                    style={styles.button}
                >
                    Concluir
                </Button>           

            </View>           
        </Background>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: "center",
       zIndex: 0
   },
   scrollWidth: {
        width: WidthScreen
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
   },
   button: {
       zIndex: 0
   }
});

export default connect(null, { SetAccountInfo })(ConfigParent);