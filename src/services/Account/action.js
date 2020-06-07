import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";
import { setInfo } from "../Api/AccountApi";

/* -- Actions states -- */ 

//Action states - User

const Request = () => ({
    type: constants.REQUEST    
});

const Success = () => ({
    type: constants.SUCCESS    
});

const Failure = error => ({
    type: constants.FAILURE,
    payload: { error }   
});

const setConfig = (type, data) => ({
    type: type,
    payload: data   
});

/* -- Actions functions -- */ 

export const SetAccountInfo = (info) => {

    return dispatch => {
        dispatch(Request());
        setInfo(info).then(data => {
            dispatch(Success());
            saveConfig("SET_TYPE", {
                type: data.type
            });
            RootStack.reset(0, [{ name: "TabBottom" }]);
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}


export const saveConfig = (type, data) => {
    return dispatch => {
        dispatch(setConfig(type, data));
    }
}