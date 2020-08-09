import React, { memo } from "react";
import { StyleSheet, Dimensions, View, StatusBar } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "galio-framework";

export default memo(({ navigation }) => {

    const handleBack = () => {
      navigation.goBack();
    }

    return (
      <View style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
      >
        <View style={styles.backButton}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <Icon
                name={'arrowleft'}
                family={'AntDesign'}
                color="#fff"
                size={28}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{
            position: 'absolute',
            width: Dimensions.get('window').width
          }}>
          <View style={{ backgroundColor: "#F58738", height: 160 }}>
            <Svg
              height="60%"
              width="100%"
              viewBox="0 0 1440 320"
              style={{ position: 'absolute', top: 130 }}
            >
              <Path fill="#F58738" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </Svg>
          </View>
        </View>        
      </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    backButton: { 
      color: "#fff", 
      zIndex: 100, 
      marginTop: StatusBar.currentHeight + 12,
      marginLeft: 15
    }
});

/*


*/