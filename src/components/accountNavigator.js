import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import ConfigParent from "../screens/Account/Parent/config";
import ConfigTeacher from "../screens/Account/Teacher/config";

const Stack = createStackNavigator();
export default memo(() => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="ConfigParent" component={ConfigParent} options={{ headerShown: false }} />
            <Stack.Screen name="ConfigTeacher" component={ConfigTeacher} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
})