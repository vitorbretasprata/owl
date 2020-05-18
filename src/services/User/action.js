import * as RootStack from "../navigation/RootNavigate";
import constants from "../constants";

/* -- Actions states -- */ 

//Action states - User

const Request = () => ({
    type: constants.REQUEST    
});

const SetAccountType = type => ({
    type: constants.SET_TYPE,
    payload: { type }
});

const SetAccountConfig = config => ({
    type: constants.SET_CONFIG,
    payload: { config }
});

/* -- Actions functions -- */ 

export const SetType = (type, Account) => {
    return dispatch => {
        dispatch(Request());
        dispatch(SetAccountType(type));

        RootStack.navigate(Account);
    }
}

export const SetConfig = config => {
    return dispatch => {
        dispatch(Request(true));
        dispatch(SetAccountConfig(config));

        RootStack.navigate("Home");
    }
}