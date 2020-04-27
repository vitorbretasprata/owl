import {} from "../Api/AuthApi";

export const checkLogin = () => {


    return {
        type: "CHANGE_STATUS",
        payload: {
            status: 2
        }
    }
}