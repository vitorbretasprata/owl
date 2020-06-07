import constants from "../constants";

const initialState = {
    status: -1,
    loading: false,
    error: null
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
                ...state,
                loading: false,
                error: null,
                status: 1
            }
        case constants.FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                status: 0
            } 
        case constants.SET_ERROR: 
            return {
                ...state,
                error: action.payload.error
            } 
        case constants.REMOVE_ERROR: 
            return {
                ...state,
                error: null
            }        
        default: 
            return state;
    }
}

export default AuthReducer;