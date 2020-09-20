export const fetchProfessorsAPI = (filter, token) => {
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

export const fetchProfessorAPI = (id, token) => {
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
                signal: abortTime.signal
            }

            fetch("http://192.168.1.182:3333/teachers/getSelectedTeacher/" + id, init)
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