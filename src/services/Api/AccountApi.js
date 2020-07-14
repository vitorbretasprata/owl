export const setInfo = (type, info) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                type,
                info
            }
            resolve(data);
        }, 5000);
    });
}

export const getInfoAccountAPI = () => {
    return new Promise((resolve, reject) => {
        const data = {
            extraInfo: {},
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
                    }
                ],
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
                    }
                ],
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
                    }
                ],
                '2020-06-30': [
                    {
                        nome: "Rodrigo Alvez",
                        horarioInicio: "14:30",
                        horarioTermino: "15:30",
                        materia: "Matemática",
                        valor: "R$ 84,00",
                        local: "Minha residência"
                    }
                ]
            }
        }

        resolve(data);
    });
}