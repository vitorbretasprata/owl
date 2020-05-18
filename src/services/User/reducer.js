import constants from "../constants";

const initialState = {
    loading: false,
    type: null,
    config: {}
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.REQUEST: 
            return {
                ...state,
                loading: true
            }        
        case constants.SET_TYPE: 
            return {
                ...state,
                loading: false,
                type: action.payload.type
            } 

        case constants.SET_CONFIG: 
            return {
                ...state,
                loading: false,
                config: action.payload.config
            }
        default: 
            return state;
    }
}

export default UserReducer;
