import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "galio-framework";
import { Text } from "galio-framework";

import Home from "../screens/Dashboard/Home/index";
import Calendario from "../screens/Dashboard/Calendario/index";
import Perfil from "../screens/Dashboard/Profile/index";
import Notificacoes from "../screens/Dashboard/Notifications/index";

const BottomTabs = createBottomTabNavigator();

export default memo(() => {
    return (
        <BottomTabs.Navigator  
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => {
                    if(route.name === "Calendario") {
                        return <Text 
                                style={{ 
                                    color: focused ? "#F58738" : "#707070"
                                }}>
                                    Calendário
                                </Text>;
                    }

                    if(route.name === "Notificacoes") {
                        return <Text 
                                style={{ 
                                    color: focused ? "#F58738" : "#707070"
                                }}>
                                    Notificações
                                </Text>;
                    }

                    return <Text 
                                style={{ 
                                    color: focused ? "#F58738" : "#707070"
                                }}>
                                    {route.name}
                            </Text>;
                },
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
                        case "Perfil":
                            IconProp.name = "user";
                            IconProp.family = "EvilIcons";
                            break;
                        case "Notificacoes":
                            IconProp.name = "notifications";
                            IconProp.family = "MaterialIcons";
                            break;                      
                        default: 
                            break;
                    }

                    return <Icon 
                                name={IconProp.name} 
                                family={IconProp.family} 
                                color={focused ? "#F58738" : "#707070"} 
                                size={IconProp.name === "user" ? 32 : 22} 
                            />;
                },

            })}
        >
            <BottomTabs.Screen name="Buscar" component={Home} />
            <BottomTabs.Screen name="Calendario" component={Calendario} />
            <BottomTabs.Screen name="Perfil" component={Perfil} />
            <BottomTabs.Screen name="Notificacoes" component={Notificacoes} />

        </BottomTabs.Navigator>
        
    );
});