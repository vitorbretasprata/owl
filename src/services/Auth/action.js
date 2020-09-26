import { preload, requestRegister, requestReset } from "../Api/AuthApi";
import constants from "../constants";
import * as RootStack from "../navigation/RootNavigate";
import { clearAccount } from "../Account/action";

/* -- Actions states -- */ 

//Action states - Login

const fetchRequest = () => ({
    type: constants.REQUEST
});

const fetchSuccess = () => ({
    type: constants.SUCCESS    
});

const fetchFailure = () => ({
    type: constants.FAILURE,
});

const logOutUser = () => ({
    type: constants.LOG_OUT
})

/* -- Actions functions -- */ 

export const LogOut = () => {
    return async dispatch => {
        dispatch(fetchRequest());
        await AsyncStorage.clear();
        clearAccount();
        dispatch(logOutUser());
        RootStack.reset(0, [{ name: "SignIn" }]);
    }
}

export const Reset = values => {
    return (dispatch) => {
        dispatch(fetchRequest());
        requestReset(values)
            .then(data => {
                dispatch(fetchSuccess());
                displayFlashMessage("success", "Redefinir senha", "Senha redefinida com sucesso.");
                RootStack.navigate(0, [{ name: "SignIn" }]);
            })
            .catch(error => {
                dispatch(fetchFailure());
                displayFlashMessage("danger", "Error", error);
            });
    }
}

export const Register = values => {
    return (dispatch) => {
        dispatch(fetchRequest());
        
    }
}

export const updateError = err => dispatch => dispatch(setError(err));

export const Preloader = token => {

    return (dispatch) => {
        preload(token)
            .then(data => {
                changeScreen(data.type);

                dispatch(fetchSuccess());
            }).catch(error => {
                dispatch(fetchFailure());
                RootStack.reset(0, [{ name: "SignIn" }]);
            });
    }
}

export const changeScreen = (type) => {
    switch(type) {
        case 0:
            RootStack.reset(0, [{ name: "Account" }]);
            break;
        case 1:
            RootStack.reset(0, [{ name: "Buscar" }]);
            break;
        case 2 || 3:
            RootStack.reset(0, [{ name: "Buscar" }]);
            break;
        default: 
            break;
    }
}