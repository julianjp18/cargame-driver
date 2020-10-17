import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon  } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { darkGrey, primaryColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';

import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../../utils/helpers';
import { normalizeLength } from '../../styles/layout';

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
    fontSize: normalizeLength(14)
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14)
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: normalizeLength(4)
  }
});

const DriverNotificationsScreen = props => {
  const driverUser = useSelector(state => state.driver);
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.driverNotifications);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

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
              <ListItem key={notification.message} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  name='bell'
                  type='font-awesome'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>{notification.message}</ListItem.Title>
                </ListItem.Content>
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
