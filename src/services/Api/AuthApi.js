const myHeaders = new Headers();

export const requestLogin = (values) => {
    return new Promise((resolve, reject) => {
        resolve({
            accountType: 0
        })
        /*
        try {
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
            }

            fetch("http://192.168.1.182:3333/auth/login", init)
                .then(data => {
                    const dataJSON = data.json();
                    console.log(dataJSON);

                    resolve(data);
                })
                .catch(error => {
                    console.log(error);
                    reject("Ocorreu um error no servidor, tente novamente mais tarde.");
                });

        } catch(error) {
            console.log(error);
            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
        */
        

    });
}

export const requestRegister = (values) => {
    return new Promise((resolve, reject) => {
        try {
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
            }

            fetch("http://192.168.1.182:3333/auth/register", init)
                .then(data => {
                    const dataJSON = data.json();
                    console.log(dataJSON);

                    resolve(data);
                })
                .catch(response => {
                    if(response.status == 422) {
                        reject("Email já cadastrado, utilize outro email.");
                    }
                });

        } catch(error) {
            console.log(error);
            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
    });
}

export const checkEmail = email => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1234);
        }, 5000);
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
        setTimeout(() => {           

            reject();
        }, 1000);
    });
}