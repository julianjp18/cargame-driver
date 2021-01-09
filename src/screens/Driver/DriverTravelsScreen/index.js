import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import { textSecondaryColor, darkGrey, primaryColor } from '../../../constants/Colors';
import DriverHeader from '../../../components/DriverHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import * as authActions from '../../../redux/actions/auth';
import * as travelActions from '../../../redux/actions/travels';
import { getUserInfo } from '../../../utils/helpers';
import { normalizeLength } from '../../../styles/layout';

const IN_PROGRESS_TRAVELS = 1;
const FINISHED_TRAVELS = 0;

const DriverTravelsScreen = props => {
  const dispatch = useDispatch();
  const [typeTravelService, setTypeTravelService] = useState(IN_PROGRESS_TRAVELS);
  const tripsInProgress = useSelector(state => state.travels.tripsInProgress);
  const tripsMade = useSelector(state => state.travels.tripsMade);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const changeTypeTravelService = (changeType) => {
    setTypeTravelService(changeType);
  };

  const viewTravel = (trip) => {
    dispatch(travelActions.saveTripSelected(trip));
    props.navigation.navigate('TravelSelected');
  };

  return (
    <View style={styles.servicesContainer}>
      <DriverHeader
        title="Mis viajes"
        subtitle="Explora tus viajes"
        leftIcon="flag"
      />
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text
            style={[
              styles.serviceTitle,
              typeTravelService === IN_PROGRESS_TRAVELS
                ? styles.serviceTitleSelected
                : ''
            ]}
            onPress={() => changeTypeTravelService(IN_PROGRESS_TRAVELS)}
          >
            Viajes en progreso
          </Text>
        </View>
        <View style={styles.col2}>
          <Text
            style={[
              styles.serviceTitle,
              typeTravelService === FINISHED_TRAVELS
                ? styles.serviceTitleSelected
                : ''
            ]}
            onPress={() => changeTypeTravelService(FINISHED_TRAVELS)}
          >
            Viajes realizados
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        {typeTravelService == IN_PROGRESS_TRAVELS ? (
          <ScrollView>
            <View style={styles.infoContainer}>
              {tripsInProgress.length > 0 ? tripsInProgress.map((tripInProgress) => (
                <TouchableOpacity key={`${tripInProgress.offerValue}-${tripInProgress.pickUpDate}`}>
                  <ListItem
                    onPress={() => viewTravel(tripInProgress)}
                    containerStyle={styles.listContainer}
                    bottomDivider
                  >
                    <Icon
                      name='bells'
                      type='antdesign'
                      color={primaryColor}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={styles.titleListItem}>
                        <Text style={styles.titleListText}>Destino: {tripInProgress.destinationCity}</Text>
                        <Text style={styles.titleListText}>{`\n`}Fecha de recogida: {tripInProgress.pickUpDate}</Text>
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
              )) : (
                <View style={styles.notFoundContainer}>
                  <AntDesign name="flag" size={100} color={primaryColor} />
                  <Text style={styles.notFoundText}>
                    No has realizado viajes por el momento
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
            <ScrollView>
              <View style={styles.infoContainer}>
                {tripsMade.length > 0 ? tripsMade.map((tripMade) => (
                  <TouchableOpacity key={`${tripMade.offerValue}-${tripMade.pickUpDate}`}>
                    <ListItem
                      onPress={() => viewTravel(tripMade)}
                      containerStyle={styles.listContainer}
                      bottomDivider
                    >
                      <Icon
                        name='bells'
                        type='antdesign'
                        color={primaryColor}
                      />
                      <ListItem.Content>
                        <ListItem.Title style={styles.titleListItem}>
                          <View>
                            <Text>
                              Destino: {tripMade.destinationCity}
                            </Text>
                            <Text>
                              Fecha de recogida: {tripMade.pickUpDate}
                            </Text>
                          </View>
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  </TouchableOpacity>
                )) : (
                  <View style={styles.notFoundContainer}>
                    <AntDesign name="flag" size={100} color={primaryColor} />
                    <Text style={styles.notFoundText}>
                      No has finalizado viajes por el momento
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: 'transparent',
    height: '100%'
  },
  nameListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalizeLength(15)
  },
  nameListText: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700'
  },
  title: {
    paddingTop: normalizeLength(6),
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  titleListText: {
    fontSize: normalizeLength(14),
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  col1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  serviceTitle: {
    width: '100%',
    paddingVertical: normalizeLength(5),
    textAlign: 'center',
    color: primaryColor,
    fontWeight: 'bold'
  },
  serviceTitleSelected: {
    backgroundColor: 'white'
  },
  notFoundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalizeLength(20),
    paddingBottom: normalizeLength(10)
  },
});

export default DriverTravelsScreen;