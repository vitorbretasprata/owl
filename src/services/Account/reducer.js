import constants from "../constants";

const initialState = {
    id: 0,
    loading: false,
    error: null,
    name: "",
    dates: {},
    location: null,
    type: 0,
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
        case constants.UPDATE_ID:
            return {
                ...state,
                id: action.payload.id
            }
        case constants.UPDATE_LECTURES:
            return {
                ...state,
                extraInfo: {
                    ...state.extraInfo,
                    lectures: {
                        ...state.extraInfo.lectures,
                        [action.payload.key]: action.payload.arr
                    }
                }
            }
        case constants.ADD_SCHEDULE:
            return {
                ...state,
                dates: {
                    ...state.dates,
                    [action.payload.date]: action.payload.lecture
                }
            }
        case constants.SET_SCHEDULE:
            return {
                ...state,
                dates: action.payload.schedules
            }
        case constants.SET_BANK_ACCOUNT:
            return {
                ...state,
                extraInfo: {
                    ...state.extraInfo,
                    bankInfo: action.payload.bankInfo
                }
            }
        case constants.CLEAR_USER_ACCOUNT:
            return initialState;
        default: 
            return state;
    }
}

export default AccountReducer;
