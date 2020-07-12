import constants from "../constants";

const initialState = {
    status: -1,
    loading: false,
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.REQUEST: 
            return {
                ...state,
                loading: true
            }
        case constants.SUCCESS: 
            return {
                loading: false,
                status: 1
            }
        case constants.FAILURE: 
            return {
                loading: false,
                status: 0
            }                      
        default: 
            return state;
    }
}

export default AuthReducer;