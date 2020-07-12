import React, { memo } from 'react';
import Day from "react-native-calendars/src/calendar/day/basic";

export default memo((props) => {
    const { date, marking } = props;
    marking.disabled = "";
    marking.disableTouchEvent = marking.disabled === true ? true : false;
    
    return <Day {...props} />;
});