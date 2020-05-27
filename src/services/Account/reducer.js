import constants from "../constants";

const initialState = {
    loading: false,
    error: null
}

const UserReducer = (state = initialState, action) => {
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
                config: action.payload.error
            }
        default: 
            return state;
    }
}

export default UserReducer;
