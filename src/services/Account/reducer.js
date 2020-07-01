import constants from "../constants";

const initialState = {
    loading: false,
    error: null,
    Name: "",
    type: 0,
    dates: {
        "2020-06-27": [
            {
                nome: "Vitor Prata",
                horarioInicio: "9:30",
                horarioTermino: "10:30",
                materia: "Matemática",
                valor: "R$ 84,00",
                local: "Gilberto Salomão"
            },
            {
                nome: "Vitor Prata",
                horarioInicio: "11:30",
                horarioTermino: "12:30",
                materia: "Português",
                valor: "R$ 84,00",
                local: "Minha residência"
            }],
        '2020-06-28': [
            {
                nome: "José Abreu",
                horarioInicio: "15:30",
                horarioTermino: "16:30",
                materia: "História",
                valor: "R$ 84,00",
                local: "Colégio Mackenzie"
            },
            {
                nome: "Fábio Prata",
                horarioInicio: "7:30",
                horarioTermino: "8:30",
                materia: "Biologia",
                valor: "R$ 84,00",
                local: "Parque da cidade"
            }],
        '2020-06-29': [
            {
                nome: "Jessica Prata",
                horarioInicio: "9:30",
                horarioTermino: "10:30",
                materia: "Fisica",
                valor: "R$ 84,00",
                local: "Hospital Brasília"
            },
            {
                nome: "Ana",
                horarioInicio: "17:30",
                horarioTermino: "18:30",
                materia: "Português",
                valor: "R$ 84,00",
                local: "Minha residência"
            }],
        '2020-06-30': [
            {
                nome: "Rodrigo Alvez",
                horarioInicio: "14:30",
                horarioTermino: "15:30",
                materia: "Matemática",
                valor: "R$ 84,00",
                local: "Minha residência"
            }]
    },
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
        default: 
            return state;
    }
}

export default AccountReducer;
