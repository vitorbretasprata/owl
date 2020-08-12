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

const updateLectures = (arr, key) => ({
    type: constants.UPDATE_LECTURES,
    payload: {
        key,
        arr
    }
});

const updateSchedule = (type, date, lecture) => ({
    type,
    payload: {
        date,
        lecture
    }
});

const setSchedule = (arr) => ({
    type: constants.SET_SCHEDULE,
    payload: {
        schedules: arr
    }
});

const clearUserAccount = () => ({
    type: constants.CLEAR_USER_ACCOUNT
})

const setBankAccountInfo = bankInfo => ({
    type: constants.SET_BANK_ACCOUNT,
    payload: {
        bankInfo
    }
});

/* -- Actions functions -- */ 

export const SetAccountInfo = (type, info) => {

    return dispatch => {
        dispatch(Request());
        setInfo(type, info).then(data => {
            dispatch(Success());

            dispatch(setConfig("SET_TYPE", {
                type: data.type
            }));
            dispatch(setAccountExtraInfoAll(data.info));

            RootStack.reset(0, [{ name: "TabBottom" }]);
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}

export const getInfoAccount = () => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI.then(data => {
            dispatch(setAccountExtraInfoAll(data.extraInfo));
            dispatch(setSchedule(data.dates));
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

export const setLectures = (arr, key) => dispatch => {
    dispatch(updateLectures(arr, key))
};

export const removeLecture = (date, lecture) => {
    return dispatch => {
        dispatch(updateSchedule(constants.REMOVE_SCHEDULE, date, lecture));
    }
}

export const scheduleClass = (date, lecture) => {
    return dispatch => {
        dispatch(updateSchedule(constants.ADD_SCHEDULE, date, lecture));
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

export const setLectureInfo = (lectureTime, lectureValue, movementValue ) => {
    return dispatch => {
        dispatch(setAccountExtraInfo(lectureTime, "lectureTime"));
        dispatch(setAccountExtraInfo(lectureValue, "lectureValue"));
        dispatch(setAccountExtraInfo(movementValue, "movementValue"));
    }
}

export const setBankAccount = bankInfo => {
    return dispatch => {
        dispatch(setBankAccountInfo(bankInfo));
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

export const clearAccount = () => {
    return dispatch => {
        dispatch(clearUserAccount());
    }
}

export const saveConfig = (type, data) => {
    return dispatch => {
        dispatch(setConfig(type, data));
    }
}

export const setAccountType = (type) => {
    return dispatch => {
        dispatch(setConfig("SET_TYPE", {
            type
        }));
    }
}