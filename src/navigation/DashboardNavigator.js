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

import DashboardScreen from '../screens/Driver/DashboardScreen';
import TruckActivationFormScreen from '../screens/Driver/TruckScreens/TruckActivationFormScreen';
import AuthScreen from '../screens/Auth/AuthScreen';

const tabNavigator = createBottomTabNavigator({
        Home: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Inicio',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" size={25} color="black" />
                }
            }
        },
        Offers: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Ofertas',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons name="monetization-on" size={24} color="black" />
                }
            }
        },
        Notifications: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Notificaciones',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="inbox" size={25} color="black" />
                }
            }
        },
        Services: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Servicios',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="customerservice" size={25} color="black" />
                }
            }
        },
        Profile: {
            screen: DashboardScreen,
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

const DashboardNavigator = createStackNavigator({
    Dashboard: tabNavigator,
    TruckActivationService: TruckActivationFormScreen,
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView
                    forceInset={
                        { 
                            top: 'always',
                            horizontal: 'never'
                        }
                    }
                >
                    <DrawerItems {...props} />
                    <Button
                        title="Salir"
                        color='red'
                        onPress={() => {
                            dispatch(authActions.logout());
                            props.navigation.navigate('Auth');
                        }}
                    />
                </SafeAreaView>
            </View>
        );
    }
});

const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            headerTitle: 'Iniciar sesión'
        }
    }
}, {
    defaultNavigationOptions: {
        headerTintColor: "#FFFFFF",
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#1D59A2' : '#1D59A2'
        }
    },
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Dashboard: {
        screen: DashboardNavigator,
        navigationOptions: {
            headerTitle: 'Dashboard'
        }
    }
});

export default createAppContainer(MainNavigator);