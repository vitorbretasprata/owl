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

            fetch("https://f594a61c0cab.ngrok.io/account/setAccountInfo", init)
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
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    type: type
                }),
                signal: abortTime.signal
            }

            fetch("https://f594a61c0cab.ngrok.io/account/getAccountInfo", init)
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

            fetch("https://f594a61c0cab.ngrok.io/account/updateTeacherBankInfo", init)
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

            fetch("https://f594a61c0cab.ngrok.io/teachers/getDate", init)
                .then(async response => {

                    if(response.status === 500) {
                        reject("Ocorreu um problema ao carregas as atividades, tente novamente mais tarde.");
                    }

                    const dataJSON = [
                        {
                            "id": 4,
                            "student_id": 1,
                            "teacher_id": 9,
                            "date": "2020-10-21T13:40:00.000Z",
                            "status": 1,
                            "location": "online",
                            "need_movement": 0,
                            "total_value": 70
                          },
                          {
                            "id": 5,
                            "student_id": 1,
                            "teacher_id": 9,
                            "date": "2020-10-22T01:40:00.000Z",
                            "status": 1,
                            "location": "online",
                            "need_movement": 0,
                            "total_value": 70
                          }
                    ]
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

            fetch("https://f594a61c0cab.ngrok.io/account/updateTeacherLectures", init)
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

            fetch("https://f594a61c0cab.ngrok.io/account/updateTeacherInfo", init)
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

            fetch("https://f594a61c0cab.ngrok.io/account/updatePushToken", init)
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