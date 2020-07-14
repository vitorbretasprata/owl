const myHeaders = new Headers();

export const requestLogin = (values) => {
    return new Promise((resolve, reject) => {
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
                mode: 'cors',
                cache: 'default'
            }

            console.log(init)
    
            fetch("http://192.168.1.182:3333/auth/login", init)
                .then(data => console.log(data))
                .catch(error => console.error(error));

        } catch(error) {
            console.error(error);
            reject("Ocorreu um error no servidor, tente novamente mais tarde.");
        }
        */
       const data = {
           name: 'Vitor Bretas Prata',
           accountType: 0           
       }     

        resolve(data);
                
    });
}

export const requestRegister = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Email ou senha inválidos.");
        }, 5000);
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