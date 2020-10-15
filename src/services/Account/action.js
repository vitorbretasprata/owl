import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";
import { setAccountInfoAPI, getInfoAccountAPI, fetchActivityDayAPI, updateTeacherLecturesAPI, updateTeacherLectureInfoAPI } from "../Api/AccountApi";
import { displayFlashMessage } from "../../components/displayFlashMessage";

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

export const SetAccountInfo = (data) => {

    return dispatch => {
        dispatch(Request());

        dispatch(setConfig("UPDATE_ID", {
            id: data.id
        }));

        dispatch(setConfig("SET_NAME", {
            name: data.complete_name
        }));

        dispatch(Success());
    }
}

export const fetchActivityDay = (date, token) => {
    return dispatch => {
        dispatch(Request());
        fetchActivityDayAPI(date, token)
            .then(data => {

                const date = data[0].date.split("T")[0];

                const schedulesLectures = data.map(lecture => {
                    const currentDate = new Date(lecture.date);
                    const initHour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

                    return {
                        nome: "Vitor",
                        horarioInicio: initHour,
                        horarioFim: "",
                        materia: "",
                        valor: lecture.total_value,
                        local: lecture.location
                    }
                });

                dispatch(updateSchedule(constants.ADD_SCHEDULE, date, schedulesLectures));

                dispatch(Success());
            }).catch(error => {
                dispatch(Failure(error.message));
            });
    }
}

export const getInfoAccount = (token, type) => {
    return dispatch => {
        dispatch(Request());
        getInfoAccountAPI(token, type)
            .then(data => {
                dispatch(setAccountExtraInfoAll(data.extraInfo));
            }).catch(error => {
                displayFlashMessage("danger", "Error", error);
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

export const setLectures = (token, arr, key) => dispatch => {
    return dispatch => {
        updateTeacherLecturesAPI.then(data => {
            dispatch(updateLectures(arr, key));
            dispatch(displayFlashMessage("success", "Informações salvas", "Matérias salvas com sucesso."));
        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
};

export const removeLecture = (date, lecture) => {
    return dispatch => {
        dispatch(updateSchedule(constants.REMOVE_SCHEDULE, date, lecture));
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

export const setLectureInfo = (token, phone, lectureTime, lectureValue, movementValue) => {
    return dispatch => {
        dispatch(Request());
        updateTeacherLectureInfoAPI(token, phone, lectureTime, lectureValue, movementValue)
            .then(data => {
                dispatch(displayFlashMessage("success", "Informações salvas", "Informações sobre as aulas salvas com sucesso."));

                dispatch(setAccountExtraInfo(lectureTime, "lectureTime"));
                dispatch(setAccountExtraInfo(lectureValue, "lectureValue"));
                dispatch(setAccountExtraInfo(movementValue, "movementValue"));
                dispatch(setAccountExtraInfo(phone, "phone"));

            }).catch(error => {
                dispatch(Failure(error.message));
            });
        
    }
}

export const setBankAccount = (token, bankInfo, id) => {
    return dispatch => {
        setBankAccountAPI(token, bankInfo, id)
            .then(data => {
                dispatch(displayFlashMessage("success", "Informações salvas", "Informações bancárias salvas com sucesso."));
                dispatch(setBankAccountInfo(bankInfo));
            }).catch(error => {
                dispatch(displayFlashMessage("danger", "Error", error));
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