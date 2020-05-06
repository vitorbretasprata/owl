import React, { memo } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function Social() {

  const navigation = useNavigation();

  return (
    <View style={styles.social}>
        <View style={styles.icons}>
          <TouchableWithoutFeedback style={styles.image}>
            <Image 
              style={styles.img}
              source={require("../assets/img/social/facebook.png")}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={styles.image}>
            <Image 
              style={styles.img}
              source={require("../assets/img/social/linkedin.png")}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={[styles.image, styles.google]}>
            <Image 
              style={styles.img}
              source={require("../assets/img/social/google.png")}
            />
          </TouchableWithoutFeedback>
        </View>
        

        <TouchableWithoutFeedback style={styles.margin} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.register}>Cadastrar</Text>
        </TouchableWithoutFeedback>

    </View>
  );
};

const styles = StyleSheet.create({
    social: {
        width: "100%"        
    },
    icons: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",  
      marginVertical: 10,
      paddingHorizontal: 40    
    },
    margin: {
        marginBottom: 15,
        marginTop: 30
    },
    register: {
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#404040",
        textAlign: "center"
    },
    image: {
      width: 50,
      height: 50,
      
    },
    google: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#e3e3e3"
    },
    img: {
      width: "100%",
      height: "100%"
    }
});

export default memo(Social);



// Neste momento nos pedimos para que vocês aguardem, estamos trabalhando para estabilizar o a plataforma.