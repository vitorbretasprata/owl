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
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    filter : {
                        lecture_id: 1
                    },
                    limit : 15,
                    page : 1
                }),
                signal: abortTime.signal
            }

            fetch("http://192.168.1.182:3333/teachers/listTeachers", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregas professores, tente novamente mais tarde.");
                    }

                    const dataJSON = await response.json();
                    resolve(dataJSON);
                })
                .catch(response => {
                    reject("Ocorreu um problema ao carregas professores, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar novos proferroes.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }

    });
}


export const fetchActivityDayAPI = (date, token) => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ date }),
                signal: abortTime.signal
            }

            fetch("http://192.168.1.182:3333/teachers/getDate", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                    }

                    const dataJSON = [
                        {
                            "id": 4,
                            "student_id": 1,
                            "teacher_id": 9,
                            "date": "2020-10-21T13:40:00.000Z",
                            "status": 1,
                            "location": "online",
                            "need_movement": 0,
                            "total_value": 70
                          },
                          {
                            "id": 5,
                            "student_id": 1,
                            "teacher_id": 9,
                            "date": "2020-10-22T01:40:00.000Z",
                            "status": 1,
                            "location": "online",
                            "need_movement": 0,
                            "total_value": 70
                          }
                    ]
                    resolve(dataJSON);
                })
                .catch(response => {
                    reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as atividades.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }

    });
}

export const registerToken = (token, authToken) => {
    return new Promise((resolve, reject) => {

        


        resolve();
    });
}