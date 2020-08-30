import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import * as authActions from '../../redux/actions/auth';

const IN_PROGRESS_TRAVELS = 1;
const FINISHED_TRAVELS = 0;

const DriverTravelsScreen = props => {
  const dispatch = useDispatch();
  const [typeTravelService, setTypeTravelService] = useState(IN_PROGRESS_TRAVELS);
  const tripsInProgress = useSelector(state => state.travels.tripsInProgress);
  const tripsMade = useSelector(state => state.travels.tripsMade);

  const user = useSelector(state => state.user);
  if (!user || !useSelector(state => state.auth)) {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  }

  const changeTypeTravelService = (changeType) => {
    setTypeTravelService(changeType);
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
              {tripsInProgress ? tripsInProgress.map((tripInProgress) => (
                <TouchableOpacity key={`${tripInProgress.offerValue}-${tripInProgress.pickupDate}`}>
                  <ListItem
                    containerStyle={styles.listContainer}
                    bottomDivider
                    leftIcon={
                      <AntDesign name="bells" size={24} color={primaryColor} />
                    }
                    rightIcon={
                      <AntDesign name="right" size={24} color={primaryColor} />
                    }
                    title={(
                      <View>
                        <Text>
                          Destino: {tripInProgress.destinationCity}
                        </Text>
                        <Text>
                          Fecha de recogida: {tripInProgress.pickupDate}
                        </Text>
                      </View>
                    )}
                    titleStyle={styles.titleListItem}
                  />
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
                {tripsMade ? tripsMade.map((tripMade) => (
                  <TouchableOpacity key={`${tripMade.offerValue}-${tripMade.pickupDate}`}>
                    <ListItem
                      containerStyle={styles.listContainer}
                      bottomDivider
                      leftIcon={
                        <AntDesign name="bells" size={24} color={primaryColor} />
                      }
                      rightIcon={
                        <AntDesign name="right" size={24} color={primaryColor} />
                      }
                      title={(
                        <View>
                          <Text>
                            Destino: {tripMade.destinationCity}
                          </Text>
                          <Text>
                            Fecha de recogida: {tripMade.pickupDate}
                          </Text>
                        </View>
                      )}
                      titleStyle={styles.titleListItem}
                    />
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
    paddingVertical: '5%',
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
    marginTop: '20%',
    paddingBottom: '10%'
  },
  notFoundText: {

  },
});

export default DriverTravelsScreen;