import { AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { preload, requestLogin } from "../Api/AuthApi";
import constants from "./constants";

const navigation = useNavigation();

/* -- Actions states -- */ 

//Action states - Login

const fetchRequest = () => ({
    type: constants.FETCH_REQUEST
});

const fetchSuccess = status => ({
    type: constants.FETCH_SUCCESS,
    payload: {
        status
    }
});

const fetchFailure = error => ({
    type: constants.FETCH_FAILURE,
    payload: { 
        error
    }
});

/* -- Actions functions -- */ 


export const Login = values => {

    return function(dispatch) {
        dispatch(fetchRequest());

        requestLogin(values)
            .then(data => {
                dispatch(fetchSuccess(1));
                AsyncStorage.setItem("token", data.token);
            })
            .catch(error => {
                dispatch(fetchFailure(error));
            });
    }
}

export const Preloader = token => {

    return function(dispatch) {
        preload(token)
            .then(res => {
                dispatch(fetchSuccess(1));
                navigation.navigate("Home");
            }).catch(error => {
                dispatch(fetchSuccess(0));
                navigation.navigate("SignIn");
            });   
    }
}