const initialState = {
    email: '',
    status: 0
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_EMAIL": 
            return {
                ...state,
                email: action.payload.email
            }
        case "CHANGE_STATUS": 
            return {
                ...state,
                email: action.payload.email
            }
        default: 
            return state;
    }
}

export default AuthReducer;