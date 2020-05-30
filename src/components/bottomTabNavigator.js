import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "galio-framework";

import Home from "../screens/Dashboard/Home";
import HeaderSearch from "../screens/Dashboard/components/header";

const bottomTabs = createBottomTabNavigator();

export default memo(() => {
    return (
        <bottomTabs.Navigator            
            screenOptions={({ route }) => ({
                
                tabBarIcon: ({ focused }) => {
                    let IconProp = {
                        name: null,
                        family: null
                    }

                    switch(route.name) {
                        case "Buscar":
                            IconProp.name = "search1";
                            IconProp.family = "AntDesign";
                            break;
                        case "Calendario":
                            IconProp.name = "calendar";
                            IconProp.family = "AntDesign";
                            break;                        
                        default: 
                            break;
                    }

                    return <Icon 
                                name={IconProp.name} 
                                family={IconProp.family} 
                                color={focused ? "#F58738" : "#707070"} 
                                size={15} 
                            />;
                },
                
            })}
        >
            <bottomTabs.Screen name="Buscar" component={Home} options={{ tabBarLabel: "Buscar" }}/>
        </bottomTabs.Navigator>
    );
});