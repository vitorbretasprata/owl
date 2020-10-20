export const requestLogin = (values) => {
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
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/auth/login", init)
                .then(async data => {

                    if(data.status === 404 || data.status === 500) {

                        const error = await data.json();
                        reject(error.message);
                        return;
                    }

                    const dataJSON = await data.json();

                    resolve(dataJSON);
                })
                .catch(error => {
                    console.log(error)
                    reject("Ocorreu um error no servidor, tente novamente mais tarde.");
                });

        } catch(error) {
            if(error.errors && Array.isArray(dataJSON.errors)) {
                const message = error.errors[0].message;
                reject(message);
            }
            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
    });
}

export const requestRegister = (values) => {
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
                },

                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.repeat
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/auth/register", init)
                .then(async data => {

                    if(data.status !== 200) {
                        const dataJSON = await data.json();
                        reject(dataJSON.message);
                        return;
                    }

                    resolve("Dados cadastrados com sucesso.");

                })
                .catch(error => {
                    reject("Ocorreu um error no servidor, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Servidor não está respondendo, tente denovo mais tarde.");
            }, 30000);

        } catch(error) {
            console.log(error)
            if(error.errors && Array.isArray(dataJSON.errors)) {
                const message = error.errors[0].message;
                reject(message);
            }

            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
    });
}

export const checkEmail = email => {
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
                },
                body: JSON.stringify({ email }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/auth/confirmEmail", init)
                .then(async response => {
                    const dataJSON = await response.json();

                    if(response.status === 404) {
                        console.log(dataJSON)
                        reject(dataJSON.message);
                        return;
                    }

                    resolve(dataJSON);
                })
                .catch(error => {
                    console.log(error)
                    reject("Ocorreu um error no servidor, tente novamente mais tarde.")
                });

                timeOut = setTimeout(() => {
                    abortTime.abort();
                    reject("Servidor não está respondendo, tente denovo mais tarde.");
                }, 30000);

        } catch(error) {
            console.log(error);
            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
    });
}

export const requestReset = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Email ou senha inválidos.");
        }, 5000);
    });
}


export const preload = async token => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const init = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + token
                },
                signal: abortTime.signal
            }

            fetch("http://192.168.1.182:3333/auth/authenticate", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Token inválido.");
                    }
                    const dataJSON = await response.json();
                    resolve(dataJSON);
                })
                .catch(response => {
                    console.log(response);
                    if(response.status == 500) {

                        if(response.detail)
                            reject(response.detail);
                        else
                            reject(response.message);
                    }
                });

        } catch(error) {
            console.log(error);
        }
    });
}