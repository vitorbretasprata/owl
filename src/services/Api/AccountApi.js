export const setInfo = info => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({                
                userType: 0                
            })
        }, 5000);
    });
}