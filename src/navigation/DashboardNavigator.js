import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { accentColor, primaryColor } from '../constants/Colors';
import DriverDashboardScreen from '../screens/Driver/DriverDashboardScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DriverHomeScreen from '../screens/Driver/DriverHomeScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import DriverProfileScreen from '../screens/Driver/DriverProfileScreen';
import DriverSupportScreen from '../screens/Driver/DriverSupportScreen';
import DriverNotificationsScreen from '../screens/Driver/DriverNotificationsScreen';
import DriverTravelsScreen from '../screens/Driver/DriverTravelsScreen';
import EditPhoneNumberScreen from '../screens/Driver/EditProfile/EditPhoneNumberScreen';
import StartupScreen from '../screens/StartupScreen';
import DriverOffersScreen from '../screens/Driver/DriverOffersScreen';
// import GoogleMapScreen from '../screens/GoogleMapScreen';
import Location from '../screens/Location';
import ShowOfferScreen from '../screens/Driver/DriverNotificationsScreen/ShowOfferScreen';
import OfferForm from '../screens/Driver/DriverOffersScreen/OfferForm';
import TravelSelectedScreen from '../screens/Driver/DriverTravelsScreen/TravelSelectedScreen';
import CompleteDescriptionScreen from '../screens/Driver/DriverNotificationsScreen/CompleteDescriptionScreen';
import StartOfferScreen from '../screens/Driver/DriverNotificationsScreen/StartOfferScreen';
import EndOfferScreen from '../screens/Driver/DriverNotificationsScreen/EndOfferScreen';
import SuccessRegisterScreen from '../screens/Auth/SuccessRegisterScreen';

const profileNavigator = createSwitchNavigator({
  Profile: DriverProfileScreen,
  EditPhoneNumber: EditPhoneNumberScreen,
});

const TravelsNavigator = createSwitchNavigator({
  Travels: DriverTravelsScreen,
  TravelSelected: TravelSelectedScreen,
});

const OffersNavigator = createSwitchNavigator({
  Offers: DriverOffersScreen,
  OfferForm: OfferForm,
});

const NotificationsNavigator = createSwitchNavigator({
  Notifications: DriverNotificationsScreen,
  ShowOffer: ShowOfferScreen,
  ShowResumeOffer: CompleteDescriptionScreen,
  StartOffer: StartOfferScreen,
  EndOffer: EndOfferScreen,
  Profile: profileNavigator,
  Travels: TravelsNavigator,
});

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
    screen: OffersNavigator,
    navigationOptions: {
      tabBarLabel: 'Ofertas',
      tabBarIcon: (tabInfo) => {
        return <MaterialIcons name="monetization-on" size={24} color={accentColor} />
      }
    }
  },
  Notifications: {
    screen: NotificationsNavigator,
    navigationOptions: {
      tabBarLabel: "Notificaciones",
      tabBarIcon: () => {
        return <AntDesign name="inbox" size={25} color={accentColor} />;
      },
    },
  },
  Travels: {
    screen: TravelsNavigator,
    navigationOptions: {
      tabBarLabel: 'Viajes',
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="flag" size={25} color={accentColor} />
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
    screen: profileNavigator,
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
  Startup: {
    screen: StartupScreen,
    navigationOptions: {
      headerTitle: 'Index',
      headerShown: false
    }
  },
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
  SuccessRegister: SuccessRegisterScreen,
  ServicesList: {
    screen: DriverDashboardScreen,
    navigationOptions: {
      headerTitle: 'Home - driver',
      headerShown: false
    }
  },
  Dashboard: DriverTabNavigator,
  Map: {
    // screen: GoogleMapScreen,
    screen: Location,
    navigationOptions: {
      headerTitle: '',
      headerShown: true
    }
  },
});

export default createAppContainer(MainNavigator);