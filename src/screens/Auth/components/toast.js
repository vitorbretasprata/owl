import React, { memo } from "react";
import { Toast } from "galio-framework";

function ToastHandler(props) {

    const { isError, ErrorMessage } = props;

    return (
        <Toast isShow={isError} positionIndicator="bottom" color="error" round={true}>
            {ErrorMessage}
        </Toast>
    );
}

export default memo(ToastHandler);