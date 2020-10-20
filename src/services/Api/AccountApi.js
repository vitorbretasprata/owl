export const setAccountInfoAPI = (token, type, info = {}) => {
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
                    type: type,
                    info
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/setAccountInfo", init)
                .then(async response => {

                    if(response.status !== 200) {
                        reject("Ocorreu um problema ao configurar sua conta, tente novamente mais tarde.");
                        return;
                    }

                    resolve();
                })
                .catch(error => {
                    reject("Ocorreu um problema ao configurar sua conta, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar novos proferroes.");
            }, 60000);

        } catch(error) {
            reject("Ocorreu um problema ao configurar sua conta, tente novamente mais tarde.");
        }
    });
}

export const getInfoAccountAPI = (token, type) => {
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
                    'Authorization': 'Bearer ' + token
                },
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/getAccountInfo", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregar as configurações, tente novamente mais tarde.");
                    }

                    const dataJSON = await response.json();

                    let teacherLectures = {};
                    dataJSON.accountTypeTeacher.lectures.forEach(lecture => {
                        teacherLectures[lecture.name] = (!teacherLectures[lecture.name]) ? [lecture.yearCode] : [...teacherLectures[lecture.name], lecture.yearCode]
                    });

                    const extraInfo = {
                        lectureTime: dataJSON.accountTypeTeacher.lecture_time,
                        lectureValue: dataJSON.accountTypeTeacher.lecture_value,
                        movementValue: dataJSON.accountTypeTeacher.movement_value,
                        bankInfo: {
                            bankAccountId: dataJSON.accountTypeTeacher.bankingAccount.id,
                            bankId: dataJSON.accountTypeTeacher.bankingAccount.bank_id,
                            cpf: dataJSON.accountTypeTeacher.bankingAccount.cpf,
                            completeName: dataJSON.accountTypeTeacher.bankingAccount.complete_name,
                            agency: dataJSON.accountTypeTeacher.bankingAccount.agency,
                            bankAccount: dataJSON.accountTypeTeacher.bankingAccount.account_number
                        },
                        lectures: teacherLectures
                    }

                    console.log(extraInfo)
                    resolve(extraInfo);
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

export const setBankAccountAPI = (token, bankInfo, id) => {
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
                    ...bankInfo,
                    bankAccountId: id,
                    code: "033"
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/updateTeacherBankInfo", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregar as configurações, tente novamente mais tarde.");
                    }

                    resolve(response);
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

export const fetchActivityDayAPI = (date, token) => {
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
                body: JSON.stringify({ date }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/teachers/getDate", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                    }

                    const dataJSON = await response.json();
                    resolve(dataJSON);
                })
                .catch(response => {
                    reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as atividades.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }

    });
}

export const updateTeacherLecturesAPI = (token, arr, key) => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const lectures = {
                lectures: {
                    [key]: arr
                }
            }
            const init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(lectures),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/updateTeacherLectures", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao atualizar as matérias lecionadas, tente novamente mais tarde.");
                    }

                    resolve(response);
                })
                .catch(error => {
                    reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as atividades.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }

    });
}

export const updateTeacherLectureInfoAPI = (token, phone, lectureTime, lectureValue, movementValue) => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const accInfo = {
                lectureTime,
                lectureValue,
                movementValue,
                phone: phone.toString()
            }

            const init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(accInfo),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/updateTeacherInfo", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao atualizar as informações sobre o professor, tente novamente mais tarde.");
                    }

                    resolve(response);
                })
                .catch(error => {
                    reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as atividades.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }

    });
}

export const registerToken = (token, authToken) => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const init = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({
                    token: token
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/updatePushToken", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao tentar salvar suas configurações de notificação, tente novamente mais tarde.");
                    }

                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject("Ocorreu um problema ao tentar salvar suas configurações de notificação, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as atividades.");
            }, 60000);

        } catch(error) {
            console.log(error);
            reject("Ocorreu um problema ao tentar salvar suas configurações de notificação, tente novamente mais tarde.");
        }
    });
}

export const cancelLectureAPI = (id, token) => {
    return new Promise((resolve, reject) => {
        try {
            let timeOut;
            clearTimeout(timeOut);
            const abortTime = new AbortController();

            const init = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/teachers/cancel/" + id, init)
                .then(async response => {

                    console.log(id, response.status)

                    if(response.status !== 200) {
                        reject("Ocorreu um problema ao tentar cancelar a aula, tente novamente mais tarde.");
                        return;
                    }

                    resolve("");
                })
                .catch(error => {
                    reject("Ocorreu um problema ao tentar cancelar a aula, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível cancelar a aula, servidor não respondendo.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }
    });
}


export const fetchNotificationAPI = (page, token) => {
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
                    limit : 15,
                    page : page
                }),
                signal: abortTime.signal
            }

            fetch("https://4ca8f4abd941.ngrok.io/account/getNotifications", init)
                .then(async response => {

                    if(response.status !== 200) {
                        reject("Ocorreu um problema ao tentar carregar as notificações, tente novamente mais tarde.");
                        return;
                    }

                    const dataJSON = await response.json();

                    resolve({
                        total: dataJSON.meta.total,
                        data: dataJSON.data
                    });
                })
                .catch(error => {
                    console.log(error)
                    reject("Ocorreu um problema ao tentar carregar as notificações, tente novamente mais tarde.");
                });

            timeOut = setTimeout(() => {
                abortTime.abort();
                reject("Não foi possível carregar as notificações, servidor não respondendo.");
            }, 60000);

        } catch(error) {
            console.log(error);
        }
    });
}