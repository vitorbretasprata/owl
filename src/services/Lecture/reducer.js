import constants from "../constants";

const initialState = {
    loading: true,
    error: null,
    professors: []
}

const LectureReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.REQUEST_GET_PROFESSORS: 
            return {
                ...state,
                loading: true
            }        
        case constants.SUCCESS_GET_PROFESSORS: 
            return {
                ...state,
                loading: false,
                professors: [...state.professors, ...action.payload.professors],
                error: ""
            } 

        case constants.FAILURE_GET_PROFESSORS: 
            return {
                ...state,
                loading: false,
                config: action.payload.error
            }
        default: 
            return state;
    }
}

export default LectureReducer;