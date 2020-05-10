export const requestLogin = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
        }, 5000);
    });
}


export const preload = async (token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!token) {
                reject(0);
            }
        }, 1000);
    });
}