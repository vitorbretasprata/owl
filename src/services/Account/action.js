import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";
import { setInfo, getInfoAccountAPI } from "../Api/AccountApi";

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

const setAccountExtraInfoAll = data => ({
    type: constants.SET_EXTRA_INFO_ALL,
    payload: data
});

const setAccountExtraInfo = (data, name) => ({
    type: constants.SET_EXTRA_INFO,
    payload: {
        name,
        data
    }
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

export const getInfoAccount = (type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfoAll(data));
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}

export const setDays = (type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfo(data, "days"));
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}

export const setLectures = (type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfo(data, "lectures"));
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}

export const setPaymentMethods = (type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfo(data, "paymentMethods"));
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}

export const setDependents = (type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfo(data, "dependents"));
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