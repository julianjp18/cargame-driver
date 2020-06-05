import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../screens/Driver/DashboardScreen';
import TruckActivationFormScreen from '../screens/Driver/TruckScreens/TruckActivationFormScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import { Platform } from 'react-native';

const DashboardNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    TruckActivationService: TruckActivationFormScreen
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'red' : 'white'
        }
    }
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