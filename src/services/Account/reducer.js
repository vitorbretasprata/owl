import constants from "../constants";

const initialState = {
    loading: false,
    error: null,
    name: "",
    type: 0,
    dates: {},
    location: null,
    extraInfo: {}
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
                error: 'action.payload.error'
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

        case constants.SET_EXTRA_INFO_ALL:
            return {
                ...state,
                extraInfo: action.payload
            }
        
        case constants.SET_EXTRA_INFO:
            return {
                ...state,
                extraInfo: {
                    ...state.extraInfo,
                    [action.payload.name]: action.payload.data
                }
            } 
        case constants.UPDATE_LECTURES:
            return {
                ...state,
                extraInfo: {
                    ...state.extraInfo,
                    lectures: {
                        ...state.extraInfo.lectures,
                        [action.payload.name]: action.payload.arr
                    }
                }
            }  
        case constants.REMOVE_SCHEDULE:
            return {
                ...state,
                dates: {
                    ...state.dates,
                    [action.payload.date]: [
                        ...(state.dates[action.payload.date].filter(item => (item !== action.payload.lecture))),
                    ]
                }
            }   
        case constants.ADD_SCHEDULE:
            return {
                ...state,
                dates: {
                    ...state.dates,
                    [action.payload.date]: [...state.dates[action.payload.date], action.payload.lecture]
                }
            }             
        case constants.SET_SCHEDULE:
            return {
                ...state,
                dates: action.payload.schedules
            }
        default: 
            return state;
    }
}

export default AccountReducer;
