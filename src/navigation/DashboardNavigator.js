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
import RegisterForm from '../screens/Auth/Register/RegisterForm';
import HomeScreen from '../screens/HomeScreen';
import DriverHomeScreen from '../screens/Driver/DriverHomeScreen';

const tabNavigator = createBottomTabNavigator({
        Home: {
            screen: DriverDashboardScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Inicio',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" size={25} color="black" />
                },
            }
        },
        Offers: {
            screen: DriverDashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Ofertas',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons name="monetization-on" size={24} color="black" />
                }
            }
        },
        Notifications: {
            screen: DriverDashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Notificaciones',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="inbox" size={25} color="black" />
                }
            }
        },
        Services: {
            screen: DriverDashboardScreen,
            navigationOptions: {
                tabBarLabel: 'Servicios',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="customerservice" size={25} color="black" />
                }
            }
        },
        Profile: {
            screen: DriverDashboardScreen,
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
    DriverHome: DriverHomeScreen,
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
            headerTitle: 'Autenticación',
            headerShown: false
        }
    },
    Member: {
        screen: RegisterForm,
        navigationOptions: {
            headerTitle: 'Cuentanos de ti',
            headerShown: false
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
    Index: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Index',
            headerShown: false
        }
    },
    Auth: AuthNavigator,
    Dashboard: {
        screen: DashboardNavigator,
        navigationOptions: {
            headerTitle: 'Dashboard',
            headerShown: false
        }
    }
});

export default createAppContainer(MainNavigator);