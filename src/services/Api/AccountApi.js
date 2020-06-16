export const setInfo = info => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(info)
        }, 5000);
    });
}

export const getInfoAccountAPI = info => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(info)
        }, 5000);
    });
}