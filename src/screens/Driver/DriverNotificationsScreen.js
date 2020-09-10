import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import { AntDesign } from '@expo/vector-icons';

import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../../utils/helpers';

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: 'transparent',
    height: '100%'
  },
  nameListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%'
  },
  nameListText: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24
  },
  title: {
    paddingTop: '2%',
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: 14,
    lineHeight: 24
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: '4%'
  },
  mainCargaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCarga: {
    width: '30%',
    height: 100,
  },
});

const DriverNotificationsScreen = props => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.driverNotifications);
  const driver = useSelector(state => state.driver);
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
      {driver && (
        <ScrollView>
          <View style={styles.infoContainer}>
            {notifications.map((notification) => (
              <ListItem
                key={notification.message}
                containerStyle={styles.listContainer}
                bottomDivider
                leftIcon={
                  <AntDesign
                    name="bells"
                    size={24}
                    color={primaryColor}
                  />
                }
                title={notification.message}
                titleStyle={styles.titleListItem}
              />
            ))}
            <TouchableOpacity>
              <ListItem
                containerStyle={styles.listContainer}
                bottomDivider
                leftIcon={
                  <AntDesign
                    className=""
                    name="bells"
                    size={24}
                    color={primaryColor}
                  />
                }
                rightIcon={
                  <AntDesign
                    name="right"
                    size={24}
                    color={primaryColor}
                    onPress={() => props.navigation.navigate('Services')}
                  />
                }
                title="¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda."
                titleStyle={styles.titleListItem}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DriverNotificationsScreen;
