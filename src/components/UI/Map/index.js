/**
 * Componente Mapa
 */

// Dependencias
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import useMap from './useMap';
import usePermission, { PERMISSIONS } from '../../../hooks/usePermission';

const getCurrentPosition = () => {
    return Location.getCurrentPositionAsync({});
};

const watchCurrentPosition = (cb, options = {}) => {
    return Location.watchPositionAsync(options, cb);
};

/**
 * Componente Mapa
 * 
 */
const Map = ({ data, configuration, children }) => {

    const {
        region: { data: initialRegion, handlers: regionHandlers },
        markers: { data: markers, handlers: markersHandlers },
        directions: { data: directions, handlers: directionsHandlers }
    } = data;

    const {
        zoom,
        showCenterMarker = true,
        showCurrentLocation = true,
        onCurrentLocationChange
    } = configuration;

    const onDenyPermission = () => {
        alert('Please accept Permission');
    }

    const _getCurrentPosition = async () => {
        try {
            const position = await getCurrentPosition()
            // get Position
        }
        catch (error) {
            console.log('error: ', error);

        }
    }

    // useState(() => {
    //     if (onCurrentLocationChange) {
    //         watchCurrentPosition(onCurrentLocationChange);
    //     }
    // }, []);

    const permission = usePermission(PERMISSIONS.LOCATION, onDenyPermission);

    const Markers = () => markers
        ? Object.values(markers).map((marker, index) =>
            <Marker
                key={index}
                coordinate={marker.coordinate}
                pinColor={marker.color}
            />
        )
        : null;

    const Directions = () => directions.origin && directions.destination
        ? <MapViewDirections
            key={index}
            origin={directions.origin}
            destination={directions.destination}
            // onStart={this.onStart}
            // onReady={this.onReady}
            strokeWidth={3}
            strokeColor={directions.color || 'blue'}
            apikey={"AIzaSyCN3wz6v8apPgkJKVzLnH2SymwRVj55N5A"}
        />
        : null;

    return (
        <View style={styles.container}>
            { permission &&
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    zoomEnabled={zoom}
                    zoomControlEnabled={zoom}
                    onRegionChangeComplete={regionHandlers.change}
                >
                    <Markers />
                    <Directions />
                    {children}
                </MapView>
            }
            {showCenterMarker &&
                <View style={styles.markerFixed}>
                    <Entypo name="location-pin" size={40} color="black" />
                </View>
            }
            {showCurrentLocation &&
                <TouchableOpacity style={styles.currentLocation} onPress={_getCurrentPosition}>
                    <MaterialIcons name="my-location" size={40} color="green" />
                </TouchableOpacity>
            }
        </View>
    );
};

Map.propTypes = {

};

var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    markerFixed: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        bottom: ((device_height / 2) - 20)
    },
    currentLocation: {
        position: "absolute",
        left: (device_width - 60),
        bottom: 100
    }
});

export default Map;
export { useMap };