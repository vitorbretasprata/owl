import {} from "../Api/AuthApi";
import constants from "./constants";

/* -- Actions states -- */ 

//Action states - Login

const checkLoginRequest = () => ({
    type: constants.FETCH_LOGIN_REQUEST
});

const checkLoginSuccess = () => ({
    type: constants.FETCH_LOGIN_SUCCESS
});

const checkLoginFailure = () => ({
    type: constants.FETCH_LOGIN_FAILURE
});

/* -- Actions functions -- */ 


const checkLogin = () => {

    return function(dispatch) {

    }
}