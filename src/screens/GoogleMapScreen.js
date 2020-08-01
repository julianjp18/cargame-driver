import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { primaryColor } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

import * as placesActions from '../redux/actions/places';

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  headerButtonContainer: {
    position: 'absolute',
    bottom: '0%',
    height: '10%',
    width: '100%',
    backgroundColor: '#f3f3f3',
    zIndex: 100,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  col: {
      width: '33%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  saveButtonText: {
    paddingVertical: '10%',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 20,
    color: primaryColor,
  }
});

const GoogleMapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [region, setRegion] =
    useState({
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
  const dispatch = useDispatch();
  const typeFieldSelected = useSelector(state => state.places.typeFieldSelected)
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;

    props.navigation.goBack({
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    })
  }, [savePickedLocationHandler]);

  const selectLocationHandler = async (event) => {

    const location = {
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    };
    const savedLocation = await dispatch(
      placesActions.getPosition(location));
    
    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
      address: savedLocation.address,
    })
  };

  const saveFunction = props.navigation.getParam('saveLocation');

  const onRegionChange = (region) => {
    setRegion(region);
  };

  const acceptLocationHandler = () => {
    if (selectedLocation) {
      dispatch(
        placesActions.savePosition(selectedLocation, typeFieldSelected));
      props.navigation.navigate('HomeDriver');
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.headerButtonContainer} onPress={saveFunction}>
        <View style={styles.row}>
          <View style={styles.col}>
            <AntDesign
              name="back"
              size={24}
              color={primaryColor}
              onPress={() => props.navigation.navigate('Dashboard')}
              />
          </View>
          <View style={styles.col}>
            {!selectedLocation ? (
              <ActivityIndicator size="large" color={primaryColor} />
            ) : (
              <Text>
                {selectedLocation ? selectedLocation.address : 'No location chosen yet!'}
              </Text>
            )}
          </View>
          <View style={styles.col}>
            {selectedLocation &&
              <Text style={styles.saveButtonText} onPress={acceptLocationHandler}>Aceptar</Text>}
          </View>
        </View>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
        onPress={selectLocationHandler}
      >
        {selectedLocation &&
          <Marker
            title={selectedLocation.address}
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude
            }}
          ></Marker>
        }
      </MapView>
    </View>
  );
};

export default GoogleMapScreen;