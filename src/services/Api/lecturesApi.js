export const getProfessorsAPI = filter => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({                
                professors: []                
            })
        }, 5000);
    })
}