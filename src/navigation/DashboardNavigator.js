import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import DriverDashboardScreen from '../screens/Driver/DriverDashboardScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DriverHomeScreen from '../screens/Driver/DriverHomeScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { accentColor, primaryColor } from '../constants/Colors';
import DriverProfileScreen from '../screens/Driver/DriverProfileScreen';
import DriverSupportScreen from '../screens/Driver/DriverSupportScreen';

const DriverTabNavigator = createBottomTabNavigator({
        HomeDriver: {
            screen: DriverHomeScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Inicio',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" size={25} color={accentColor} />
                },
            }
        },
        Offers: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Ofertas',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons name="monetization-on" size={24} color={accentColor} />
                }
            }
        },
        Notifications: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Notificaciones',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="inbox" size={25} color={accentColor} />
                }
            }
        },
        Services: {
            screen: DriverSupportScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Servicios',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="customerservice" size={25} color={accentColor} />
                }
            }
        },
        Profile: {
            screen: DriverProfileScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Perfil',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="user" size={25} color={accentColor} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: primaryColor,
            activeBackgroundColor: 'rgba(200,200,200,.5)'
        },
        barStyle: {
        }
    }
);

const MainNavigator = createSwitchNavigator({
    Index: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Index',
            headerShown: false
        }
    },
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            headerTitle: 'Autenticación',
            headerShown: false
        }
    },
    Member: {
        screen: RegisterScreen,
        navigationOptions: {
            headerTitle: 'Cuentanos de ti',
            headerShown: false
        }
    },
    ServicesList: {
        screen: DriverDashboardScreen,
        navigationOptions: {
            headerTitle: 'Home - driver',
            headerShown: false
        }
    },
    Dashboard: DriverTabNavigator,
});

export default createAppContainer(MainNavigator);