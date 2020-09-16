import { showMessage } from "react-native-flash-message";


export const displayFlashMessage = (type, title, msg) => {
    showMessage({
        message: title,
        description: msg,
        type: type,
        duration: 2890
    });
}