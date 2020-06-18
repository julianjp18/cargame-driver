import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/auth';
import {
    createAppContainer,
    createSwitchNavigator,
    DrawerItems
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import DriverDashboardScreen from '../screens/Driver/DriverDashboardScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DriverHomeScreen from '../screens/Driver/DriverHomeScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const DriverTabNavigator = createBottomTabNavigator({
        HomeDriver: {
            screen: DriverHomeScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Inicio',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" size={25} color="black" />
                },
            }
        },
        Offers: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Ofertas',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons name="monetization-on" size={24} color="black" />
                }
            }
        },
        Notifications: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Notificaciones',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="inbox" size={25} color="black" />
                }
            }
        },
        Services: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Servicios',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="customerservice" size={25} color="black" />
                }
            }
        },
        Profile: {
            screen: DriverHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Perfil',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="user" size={25} color="black" />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'red',
            backgroundColor: 'rgb(200,200,200)'
        },
        barStyle: {
            backgroundColor: 'rgb(200,200,200)'
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