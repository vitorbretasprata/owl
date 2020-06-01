import constants from "../constants";

const initialState = {
    loading: false,
    error: null,
    Name: "",
    type: 0,
    location: null
}

const AccountReducer = (state = initialState, action) => {
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
                error: ""
            } 

        case constants.FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case constants.SET_TYPE:
            return {
                ...state,
                type: action.payload.type
            }
        case constants.SET_NAME:
            return {
                ...state,
                name: action.payload.name
            }
        case constants.SET_LOCATION:
            return {
                ...state,
                location: action.payload.location
            }
        default: 
            return state;
    }
}

export default AccountReducer;
