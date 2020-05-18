import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button } from "galio-framework";

function Submit(props) {

    const { onSubmit, title, isDisabled } = props;
  
    return (
        <Button 
            onPress={onSubmit}
            disabled={isDisabled} 
            color="#F58738"
            round 
            uppercase
            style={[styles.submit, { opacity: isDisabled ? 0.5 : 1 }]}
        >
            {title}
        </Button>             
    );
};

const styles = StyleSheet.create({
    submit: {
        width: "100%",     
        marginTop: 45
    }    
});

export default memo(Submit);