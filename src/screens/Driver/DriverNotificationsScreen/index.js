import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { darkGrey, primaryColor } from '../../../constants/Colors';
import DriverHeader from '../../../components/DriverHeader';

import * as authActions from '../../../redux/actions/auth';
import * as offersActions from '../../../redux/actions/offers';
import { getUserInfo } from '../../../utils/helpers';
import { normalizeLength } from '../../../styles/layout';

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: normalizeLength(16),
    marginBottom: normalizeLength(10)
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14)
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: normalizeLength(10)
  }
});

const DriverNotificationsScreen = props => {
  const driverUser = useSelector(state => state.driver);
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.driverNotifications);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const showOfferScreen = (notification) => {
    if (!notification.offerId) return true;
    try {
      dispatch(offersActions.saveOfferSelected(notification.offerId, notification.id));
      setTimeout(() => {
        props.navigation.navigate('ShowOffer');
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const showResumeOfferScreen = (notification) => {
    if (!notification.offerId) return true;
    try {
      dispatch(offersActions.saveResumeOfferSelected(notification.offerId, notification.id));
      setTimeout(() => {
        props.navigation.navigate('ShowResumeOffer');
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.servicesContainer}>
      <DriverHeader
        title="Notificaciones"
        subtitle="Explora tus notificaciones"
        leftIcon="bell-o"
      />
      {driverUser && (
        <ScrollView>
          <View style={styles.infoContainer}>
            {notifications.map((notification) => (
              <ListItem
                onPress={() => notification.status === 'RESUME' ? showResumeOfferScreen(notification) : showOfferScreen(notification)}
                key={`${notification.userId}-${notification.offerId}-${notification.date}`}
                key={notification.message}
                containerStyle={styles.listContainer}
                bottomDivider
              >
                <Icon
                  name='bell'
                  type='font-awesome'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>{notification.message}</ListItem.Title>
                </ListItem.Content>
                {notification.status && (
                  <Icon
                    name='angle-right'
                    type='font-awesome'
                    color={primaryColor}
                  />
                )}
              </ListItem>
            ))}
            <TouchableOpacity>
              <ListItem onPress={() => props.navigation.navigate('Services')} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  reverse
                  name='bell'
                  type='font-awesome'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda.</ListItem.Title>
                </ListItem.Content>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  color={primaryColor}
                />
              </ListItem>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DriverNotificationsScreen;
