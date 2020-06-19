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

export const getInfoAccountAPI = info => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(info)
        }, 5000);
    });
}