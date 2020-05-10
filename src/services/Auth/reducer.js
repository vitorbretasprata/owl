import constants from "./constants";

const initialState = {
    status: 0,
    loading: false,
    error: null,
    code: null
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.FETCH_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case constants.FETCH_SUCCESS: 
            return {
                ...state,
                loading: false,
                status: action.payload.status
            }
        case constants.FETCH_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload.error
            } 
        case constants.SET_CODE: 
            return {
                ...state,
                code: action.payload.code
            } 
        default: 
            return state;
    }
}

export default AuthReducer;