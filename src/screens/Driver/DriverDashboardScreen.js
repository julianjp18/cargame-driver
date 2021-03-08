import React, { useEffect } from 'react';
import { Text, StyleSheet, View, YellowBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import { textSecondaryColor, darkGrey } from '../../constants/Colors';
import { categoristList } from '../../constants/Utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WelcomeHeader from '../../components/WelcomeHeader';
import { setTypeService } from '../../redux/actions/auth';

import * as driverActions from '../../redux/actions/drivers';
import * as driverNotificationsAction from '../../redux/actions/notifications';
import { normalizeLength } from '../../styles/layout';

const selectedCategoryItem = (navigation, dispatch, categoryId) => {
  dispatch(setTypeService(categoryId));
  navigation.navigate('HomeDriver');
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  title: {
    paddingTop: normalizeLength(19),
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(17),
    fontWeight: '700',
    textAlign: 'center',
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(20),
    fontWeight: '500',
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(12),
    fontWeight: '400'
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: normalizeLength(5)
  },
  avatarContainer: {
    height: normalizeLength(65),
    width: normalizeLength(80)
  }
});

const DriverDashboardScreen = props => {
  const dispatch = useDispatch();
  YellowBox.ignoreWarnings([
    'Setting a timer',
    "Can't perform a React state update on an unmounted component",
    "Cannot update during an existing state transition (such as within `render`).",
  ]);
  const userAuth = useSelector(state => state.auth);

  useEffect(() => {
    if (userAuth.driverId) {
      dispatch(driverActions.showDriver(userAuth.driverId));
      dispatch(driverNotificationsAction.showDriverNotifications(userAuth.driverId));
    }
  }, [userAuth.driverId]);

  return (
    <View style={styles.servicesContainer}>
      <WelcomeHeader />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Selecciona el servicio a utilizar</Text>
      </View>
      <View>
        <ScrollView>
          {
            categoristList.map((category, i) => (
              <TouchableOpacity
                key={i}
                style={styles.selectedItem}
                onPress={
                  () => selectedCategoryItem(
                    props.navigation,
                    dispatch,
                    category.id,
                  )}
              >
                <ListItem containerStyle={styles.listContainer} key={i} bottomDivider>
                  <Avatar containerStyle={styles.avatarContainer} source={category.avatar_url} />
                  <ListItem.Content>
                    <ListItem.Title style={styles.titleListItem}>{category.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleListItem}>{category.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default DriverDashboardScreen;
