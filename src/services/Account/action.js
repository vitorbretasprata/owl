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

/* -- Actions functions -- */ 

export const SetAccountInfo = (info) => {
    return dispatch => {
        dispatch(Request());

        setInfo(info).then(data => {
            dispatch(Success());
            console.log(data)
            RootStack.reset(0, [
                { name: "Home" }
            ]);

        }).catch(error => {
            dispatch(Failure(error.message));
        });
    }
}