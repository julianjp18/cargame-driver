import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import { categoristList, URBAN_SERVICE, RURAL_SERVICE } from '../../constants/Utils';

import WelcomeHeader from '../../components/WelcomeHeader';
import Button from '../../components/UI/Button';
import LocationPicker from '../../components/UI/LocationPicker';

import * as offersAction from '../../redux/actions/offers';
import * as placesActions from '../../redux/actions/places';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  title: {
    paddingTop: '4%',
    paddingLeft: '15%',
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'left',
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: 'Ruda',
    fontSize: 20,
    fontWeight: '500',
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Ruda',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: '10%',
  },
  avatarContainer: {
    height: '100%',
    width: '22%',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
  },
  col1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col2: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: '2%',
  },
  serviceTitleSelected: {
    color: primaryColor,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: primaryColor,
  },
  infoContainer: {
    padding: '5%',
  },
  dateTravelTitle: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  dateTravelContent: {
    textAlign: 'center',
    paddingVertical: '3%',
    marginTop: '1%',
    marginBottom: '15%',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 15,
  },
  activateTypeService:{
    color: darkGrey
  }
});

const DriverHomeScreen = props => {
  const userAuth = useSelector(state => state.auth);
  if (!userAuth) {
    props.navigation.navigate('Auth');
  }
  const [typeTruckService, setTypeTruckService] = useState(RURAL_SERVICE);
  const places = useSelector(state => state.places);
  const [activateTypeService, setActivateTypeService] =
    useState(places.activateUrbanService || places.activateRuralService);
  moment.locale();
  const [date, setDate] = useState(
    places.dayActivate
      ? places.dayActivate
      : new Date()
    );
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
        Alert.alert(
            'Permisos insuficientes',
            'Necesita los permisos de geolocalización para poder obtener localización en tiempo real.',
            [{ text: 'Está bien' }]
        );
        return false;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;

    try {
        const location = await Location.getCurrentPositionAsync({ timeout: 4000 });

        dispatch(placesActions.currentPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }));
    } catch (err) {
        Alert.alert('No se puede obtener la localización', 'Por favor intentar nuevamente.', [{ text: 'Esta bien' }]);
    }
  };

  useEffect(() => {
    places.urbanServiceActivateAddress && setTypeTruckService(URBAN_SERVICE);
    getCurrentLocation();
  }, []);

  const typeServiceId = userAuth.typeServiceSelected;
  const categorySelected = categoristList.find(
    category => category.id === typeServiceId);

  userAuth && dispatch(offersAction.showActiveOffers());

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
    if(!activateTypeService){
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
            <ListItem
              containerStyle={styles.listContainer}
              title={categorySelected.name}
              titleStyle={styles.titleListItem}
              leftAvatar={{
                source: categorySelected.avatar_url,
                containerStyle: styles.avatarContainer,
                avatarStyle: styles.avatar,
                rounded: false,
              }}
              subtitleStyle={styles.subtitleListItem}
              subtitle={categorySelected.subtitle}
              bottomDivider
            />
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
