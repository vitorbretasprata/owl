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
                    filter : filter,
                    limit : 15,
                    page : 1
                }),
                signal: abortTime.signal
            }

            fetch("https://87665b1ee355.ngrok.io/teachers/listTeachers", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregas professores, tente novamente mais tarde.");
                    }

                    const dataJSON = await response.json();

                    resolve(dataJSON.data);
                })
                .catch(error => {
                    console.log(error)
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

            fetch("https://87665b1ee355.ngrok.io/teachers/getSelectedTeacher/" + id, init)
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