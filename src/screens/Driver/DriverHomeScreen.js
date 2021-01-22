import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Alert, YellowBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import { categoristList, URBAN_SERVICE, RURAL_SERVICE } from '../../constants/Utils';

import WelcomeHeader from '../../components/WelcomeHeader';
import Button from '../../components/UI/Button';
import LocationPicker from '../../components/UI/LocationPicker';

import * as offersActions from '../../redux/actions/offers';
import * as placesActions from '../../redux/actions/places';
import * as authActions from '../../redux/actions/auth';
import * as travelsActions from '../../redux/actions/travels';
import { getUserInfo } from '../../utils/helpers';
import { normalizeLength } from '../../styles/layout';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  title: {
    paddingTop: normalizeLength(10),
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(18),
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
    paddingBottom: normalizeLength(10),
  },
  avatarContainer: {
    minHeight: normalizeLength(70),
    minWidth: normalizeLength(70),
  },
  avatar: {
    width: normalizeLength(70),
    height: normalizeLength(70),
  },
  row: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
    marginTop: normalizeLength(5),
  },
  col1: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  serviceTitle: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    fontWeight: '500',
    paddingBottom: normalizeLength(2),
  },
  serviceTitleSelected: {
    color: primaryColor,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: primaryColor,
  },
  infoContainer: {
    padding: normalizeLength(20),
  },
  dateTravelTitle: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  dateTravelContent: {
    textAlign: 'center',
    paddingVertical: normalizeLength(10),
    marginTop: normalizeLength(1),
    marginBottom: normalizeLength(15),
    borderColor: primaryColor,
    borderWidth: normalizeLength(1),
    borderRadius: normalizeLength(15),
    fontWeight: '700',
    fontSize: normalizeLength(15)
  },
  activateTypeService: {
    color: darkGrey
  }
});

const DriverHomeScreen = props => {
  moment.locale('es');
  const dispatch = useDispatch();
  YellowBox.ignoreWarnings([
    'Setting a timer',
    "Can't perform a React state update on an unmounted component",
    "Cannot update during an existing state transition (such as within `render`).",
  ]);
  const userAuth = useSelector(state => state.auth);
  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  useEffect(() => {
    dispatch(travelsActions.getTripsInProgressByDriverId(userAuth.driverId));
    dispatch(travelsActions.getTripsMadeByDriverId(userAuth.driverId));
  }, []);

  const [typeTruckService, setTypeTruckService] = useState(RURAL_SERVICE);
  const places = useSelector(state => state.places);
  const [activateTypeService, setActivateTypeService] =
    useState(places.activateUrbanService || places.activateRuralService);
  const [date, setDate] = useState(
    places.dayActivate
      ? places.dayActivate
      : new Date()
  );
  const [show, setShow] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesita los permisos de geolocalización para poder obtener localización en tiempo real.',
        [{ text: 'Está bien' }]
      );
      return verifyPermissions();
    }
    return true;
  };

  const validLocationTurnOn = () => {
    if (!Location.hasServicesEnabledAsync()) {
      Alert.alert('No se puede obtener la localización', 'Por favor enciende la localización.', [{ text: 'Esta bien' }]);
      return validLocationTurnOn();
    }
    return true;
  }

  const getCurrentLocation = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;

    try {
      const location = await Location.getLastKnownPositionAsync();
      dispatch(placesActions.currentPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }));
    } catch (err) {
      validLocationTurnOn();
    }
  };

  useEffect(() => {
    places.urbanServiceActivateAddress && setTypeTruckService(URBAN_SERVICE);
    getCurrentLocation();
  }, []);

  const typeServiceId = userAuth.typeServiceSelected;
  const categorySelected = categoristList.find(
    category => category.id === typeServiceId);

  const changeTypeTruckService = (changeType) => {
    if (!activateTypeService) setTypeTruckService(changeType);
  };

  const onChangeDate = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate.nativeEvent.timestamp);
  };

  const showDatePickerModal = () => {
    setShow(!show);
  };

  const activateService = () => {
    if (!activateTypeService) {
      if (typeTruckService === RURAL_SERVICE) {
        if (places.currentAddress && places.ruralServiceDestinyAddress)
          dispatch(placesActions.activateService(
            date,
            RURAL_SERVICE,
          ));
        setActivateTypeService(true);
      }
      if (typeTruckService === URBAN_SERVICE) {
        if (places.currentAddress)
          dispatch(placesActions.activateService(
            new Date(),
            URBAN_SERVICE,
          ));
        setActivateTypeService(true);
      }

      dispatch(offersActions.showActiveOffers(userAuth.driverId, date ? date : new Date()));
    } else {
      if (typeTruckService === RURAL_SERVICE) {
        if (places.currentAddress && places.ruralServiceDestinyAddress)
          dispatch(placesActions.deactivateService(RURAL_SERVICE));
        setActivateTypeService(false);
      }
      if (typeTruckService === URBAN_SERVICE) {
        if (places.currentAddress)
          dispatch(placesActions.deactivateService(URBAN_SERVICE));
        setActivateTypeService(false);
      }
    }

  };

  return (
    typeServiceId ? (
      <View style={styles.homeContainer}>
        <WelcomeHeader />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Servicio seleccionado</Text>
        </View>
        <View>
          <ScrollView>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Avatar containerStyle={styles.avatarContainer} source={categorySelected.avatar_url} />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>{categorySelected.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>{categorySelected.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <View style={styles.row}>
              <View style={styles.col1}>
                <Text
                  style={[
                    styles.serviceTitle,
                    typeTruckService === RURAL_SERVICE
                      ? styles.serviceTitleSelected
                      : ''
                  ]}
                  onPress={() => changeTypeTruckService(RURAL_SERVICE)}
                >
                  Servicio intermunicipial
                </Text>
              </View>
              <View style={styles.col2}>
                <Text
                  style={[
                    styles.serviceTitle,
                    typeTruckService === URBAN_SERVICE
                      ? styles.serviceTitleSelected
                      : '',
                    typeTruckService !== URBAN_SERVICE
                    && activateTypeService
                    && styles.activateTypeService
                  ]}
                  onPress={() => changeTypeTruckService(URBAN_SERVICE)}
                >
                  Servicio Urbano
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View>
                <LocationPicker
                  navigation={props.navigation}
                  id="origin"
                  label={`Ciudad de ${typeTruckService == RURAL_SERVICE ? 'Origen' : 'Activación'}`}
                  errorText="¡UPS! Por favor ingresa una dirección válida."
                  initialValue={
                    places.currentAddress
                      ? places.currentAddress
                      : ''
                  }
                  disabled={activateTypeService}
                  isOriginCityTruckService={typeTruckService == RURAL_SERVICE}
                  isActivationCityTruckService={typeTruckService == URBAN_SERVICE}
                />
              </View>
              {typeTruckService == RURAL_SERVICE && (
                <View>
                  <LocationPicker
                    navigation={props.navigation}
                    id="destiny"
                    label="Ciudad de Destino"
                    errorText="¡UPS! Por favor ingresa una dirección válida."
                    initialValue={
                      places.ruralServiceDestinyAddress
                        ? places.ruralServiceDestinyAddress
                        : ''
                    }
                    disabled={activateTypeService}
                    isDestinyCityTruckService={typeTruckService == RURAL_SERVICE}
                    isActivationCityTruckService={typeTruckService == URBAN_SERVICE}
                  />
                  <Text
                    style={styles.dateTravelTitle}
                  >
                    Fecha de inicio de viaje
                  </Text>
                  <Text
                    onPress={showDatePickerModal}
                    style={styles.dateTravelContent}
                  >
                    {moment(date).format('ll')}
                  </Text>
                  {show && (
                    <DateTimePicker
                      testID="date-travel"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                      disabled={activateTypeService}
                    />
                  )}
                </View>
              )}
              <Button
                colorOne={activateTypeService && 'white'}
                colorTwo={activateTypeService && 'white'}
                fontColor={activateTypeService && primaryColor}
                title={!activateTypeService ? 'Activarme' : 'Desactivarme'}
                onPress={activateService}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    ) : (
        <View>
          <Text>Error</Text>
        </View>
      )
  );
};

export default DriverHomeScreen;
