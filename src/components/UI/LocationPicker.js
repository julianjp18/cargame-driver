import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';
import { primaryColor } from '../../constants/Colors';
import TextInput from './Input';

import * as placesActions from '../../redux/actions/places';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const dispatch = useDispatch();
    const mapPickedLocation = props.navigation.navigate('pickedLocation');

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
        }
    }, [mapPickedLocation]);

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

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) return;

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 4000 });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert('No se puede obtener la localización', 'Por favor intentar nuevamente.', [{ text: 'Esta bien' }]);
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = async () => {
      let typeFieldSelected;

      if (props.isActivationCityTruckService) {
        typeFieldSelected = 'isActivationCityTruckService';
      } else if (props.isOriginCityTruckService) {
        typeFieldSelected = 'isOriginCityTruckService';
      } else {
        typeFieldSelected = 'isDestinyCityTruckService';
      }

      dispatch(
        placesActions.changeFieldSelected(
          typeFieldSelected,
      ));
      props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationContainer}>
          <MapPreview
            style={styles.mapPreview}
            location={pickedLocation}
            onPress={pickOnMapHandler}
            disabled={props.disabled}
          >
            {isFetching ? (
                <ActivityIndicator size="large" color={primaryColor} />
            ) : (
              <TextInput
                id={props.id}
                label={props.label}
                keyboardType="default"
                required
                autoCapitalize="sentences"
                errorText={props.errorText}
                initialValue={props.initialValue}
                disabled
                isMapField
              />
            )}
        </MapPreview>
      </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        marginBottom: 15,
    },
    mapPreviewContainer: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;