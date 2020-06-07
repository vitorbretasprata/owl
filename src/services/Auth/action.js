import { preload, requestLogin, requestRegister, requestReset } from "../Api/AuthApi";
import constants from "../constants";
import * as RootStack from "../navigation/RootNavigate";


/* -- Actions states -- */ 

//Action states - Login

const fetchRequest = () => ({
    type: constants.REQUEST
});

const fetchSuccess = () => ({
    type: constants.SUCCESS    
});

const fetchFailure = error => ({
    type: constants.FAILURE,
    payload: { 
        error
    }
});


/* -- Actions functions -- */ 


export const Login = values => {
    return (dispatch) => {
        dispatch(fetchRequest());
        requestLogin(values)
            .then(data => {
                dispatch(fetchSuccess());
                switch(data.accountType) {
                    case 0:
                        RootStack.reset(0, [{ name: "Account" }]);
                        break;
                    case 1:
                        RootStack.reset(0, [{ name: "Dashboard" }]);
                        break;
                    case 2 || 3:
                        RootStack.reset(0, [{ name: "Search" }]);
                        break;                    
                    default: 
                        break;
                }                
            })
            .catch(error => {
                dispatch(fetchFailure(error));
            });
    }
}

export const Reset = values => {
    return (dispatch) => {
        dispatch(fetchRequest());
        requestReset(values)
            .then(data => {
                dispatch(fetchSuccess());   
                RootStack.navigate(0, [{ name: "SignIn" }]);                           
            })
            .catch(error => {
                dispatch(fetchFailure(error));
            });
    }
}

export const Register = values => {
    return (dispatch) => {
        dispatch(fetchRequest());
        requestRegister(values)
            .then(data => {
                dispatch(fetchSuccess());
            })
            .catch(error => {
                dispatch(fetchFailure(error));
            });
    }
}

export const setError = error => ({
    type: constants.SET_ERROR,
    payload: { error }
});

export const removeError = () => ({
    type: constants.REMOVE_ERROR
});

export const Preloader = token => {

    return (dispatch) => {
        preload(token)
            .then(res => {
                switch(res.data.accountType) {
                    case 0:
                        RootStack.reset(0, [{ name: "Account" }]);
                        break;
                    case 1:
                        RootStack.reset(0, [{ name: "Dashboard" }]);
                        break;
                    case 2 || 3:
                        RootStack.reset(0, [{ name: "Search" }]);
                        break;                    
                    default: 
                        break;
                }
                dispatch(fetchSuccess());
            }).catch(error => {
                dispatch(fetchFailure(""));
                RootStack.reset(0, [{ name: "SignIn" }]);
            });   
    }
}