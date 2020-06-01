import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";
import { getProfessorsAPI } from "../Api/lecturesApi";

/* -- Actions states -- */ 

//Action states - User

const requestGetProfessors = () => ({
    type: constants.REQUEST_GET_PROFESSORS   
});

const successGetProfessors = professors => ({
    type: constants.SUCCESS_GET_PROFESSORS,
    payload: { professors }
});

const failGetProfessors = error => ({
    type: constants.FAILURE_GET_PROFESSORS,
    payload: { error }   
});

/* -- Actions functions -- */ 

export const getProfessors = filter => {
    return dispatch => {
        dispatch(requestGetProfessors())
        getProfessorsAPI(filter).then(data => {
            dispatch(successGetProfessors(data.professors));
        }).catch(error => {
            dispatch(failGetProfessors(error.message));
        });
    }
}