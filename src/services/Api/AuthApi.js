export const requestLogin = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({                
                accountType: 0                
            })
        }, 5000);
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
            if(!token) {
                reject();
            }

            resolve();
        }, 1000);
    });
}