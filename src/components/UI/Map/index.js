/**
 * Componente Mapa
 */

// Dependencias
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons';

import useMap from './useMap';

/**
 * Componente Mapa
 * 
 */
const Map = ({ data, configuration, handlers, children }) => {

    const {
        region,
        markers,
        directions
    } = data;

    const {
        zoom,
        showCenterMarker
    } = configuration;
    console.log('showCenterMarker: ', showCenterMarker);

    const {
        onChangeRegion,
        // onMapReady
    } = handlers;

    const Markers = () => markers && markers.length > 0
        ? markers.map((marker, index) =>
            <Marker
                key={index}
                coordinate={marker.coordinate}
                pinColor={marker.color}
            />
        )
        : null;

    const Directions = () => directions && directions.length > 0
        ? directions.map((direction, index) =>
            <MapViewDirections
                key={index}
                origin={direction.origin}
                destination={direction.destination}
                // onStart={this.onStart}
                // onReady={this.onReady}
                strokeWidth={3}
                strokeColor={direction.color || 'blue'}
                apikey={"AIzaSyCN3wz6v8apPgkJKVzLnH2SymwRVj55N5A"}
            />)
        : null;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                zoomEnabled={zoom}
                zoomControlEnabled={zoom}
                onRegionChangeComplete={onChangeRegion}
            // onMapReady={onMapReady}
            >
                <Markers />
                <Directions />
                {children}
            </MapView>
            {showCenterMarker &&
                <View style={styles.markerFixed}>
                    <Entypo name="location-pin" size={40} color="black" />
                </View>
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
        bottom: ((device_height / 2) - 40)
    }
});

export default Map;
export { useMap };