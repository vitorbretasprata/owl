import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";
import { fetchProfessorsAPI } from "../Api/lecturesApi";
import AsyncStorage from "@react-native-community/async-storage";

/* -- Actions states -- */ 

//Action states - User

const requestGetProfessors = () => ({
    type: constants.REQUEST_GET_PROFESSORS   
});

const successGetProfessors = professors => ({
    type: constants.SUCCESS_GET_PROFESSORS,
    payload: { professors }
});

const successGetMoreProfessors = professors => ({
    type: constants.SUCCESS_GET_MORE_PROFESSORS,
    payload: { professors }
});

const failGetProfessors = error => ({
    type: constants.FAILURE_GET_PROFESSORS,
    payload: { error }   
});

/* -- Actions functions -- */ 

export const fetchProfessors = (filter, token) => {
    return dispatch => {
        dispatch(requestGetProfessors());
        fetchProfessorsAPI(filter, token)
            .then(res => {
                console.log(res)
            }).catch(error => {
                dispatch(failGetProfessors(error));
            });
    }
}

export const fetchMoreProfessors = (filter, token) => {
    return dispatch => {
        dispatch(requestGetProfessors());
        fetchProfessorsAPI(filter, token)
            .then(response => {
                dispatch(successGetMoreProfessors(response.data));
            }).catch(error => {
                dispatch(failGetProfessors(error));
            });
    }
}