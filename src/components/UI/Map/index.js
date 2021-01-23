/**
 * Componente Mapa
 */

// Dependencias
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Componentes
import Fallback from './Fallback';

// Hooks
import useMap from './useMap';
import usePermission, { PERMISSIONS } from '../../../hooks/usePermission';

// Configuración
import ENV from '../../../../env';

// Estilos
import { fullWidth, fullHeight } from '../../../styles/layout';

// Deltas por defecto
const latitudeDelta = 0.00522,
    longitudeDelta = (fullWidth / fullHeight * 0.00522);

/**
 * Componente Mapa
 * 
 * @param {Object} data          Datos del hook useMap
 * @param {Object} configuration Configuración adicional
 */
const Map = ({ data, configuration, children }) => {
    if (!data || !data.region || !data.directions || !data.relocate) {
        return null;
    }

    const {
        region: { data: region, handlers: regionHandlers },
        markers: { data: markers, handlers: markersHandlers },
        directions: { data: directions, handlers: directionsHandlers },
        relocate: { data: relocate, handlers: relocateHandlers },
        currentPosition: { data: currentPosition }
    } = data;

    const {
        zoom,
        showCenterMarker = true,
        showCurrentLocationMarker = true,
        onDenyPermission: _onDenyPermission
    } = configuration;

    // Hook para comprobar permisos de ubicación
    const permission = usePermission(PERMISSIONS.LOCATION, onDenyPermission);

    // Effecto para reubicar mapa
    useEffect(() => {
        if (relocate && mapRef.current) {
            centerMap(relocate);
            relocateHandlers.setRelocation(null);
        }
    }, [relocate]);

    /**
     * Manejador en caso de rechazo de los permisos
     */
    const onDenyPermission = () => {
        if (_onDenyPermission) {
            _onDenyPermission();
            return;
        }
        alert('Para continuar debes aceptar los permisos de ubicación');
    }

    /**
     * Centra el mapa en la ubicación actual
     */
    const centerCurrentLocation = async () => {
        try {
            centerMap(currentPosition.location);
        }
        catch (error) {
            // No se hace nada con este error
        }
    }

    /**
     * Centra el mapa en una ubicación
     * @param {Object} location Ubicación
     */
    const centerMap = (location) => {
        mapRef.current.animateToRegion({
            latitudeDelta,
            longitudeDelta,
            ...region,
            ...location
        });
    };

    // Componente con Marcadores que se hayan agregado
    const Markers = () => markers
        ? Object.values(markers).map((marker, index) =>
            <Marker
                key={index}
                coordinate={marker.location}
                pinColor={marker.color}
                title={marker.title}
                description={marker.description}
            />
        )
        : null;

    // Componente con Direcciones que se hayan agregado
    const Directions = () => directions.origin && directions.destination
        ? <MapViewDirections
            origin={directions.origin}
            destination={directions.destination}
            // onStart={this.onStart}
            // onReady={this.onReady}
            strokeWidth={3}
            strokeColor={directions.color || 'blue'}
            apikey={ENV.googleApiKey}
        />
        : null;

    // Referencia del mapa
    const mapRef = useRef(null);

    const initialRegion = region
        ? { latitudeDelta, longitudeDelta, ...region }
        : currentPosition
            ? { ...currentPosition.location, latitudeDelta, longitudeDelta }
            : null;

    return (
        <View style={styles.container}>
            { !permission || !initialRegion
                ? <Fallback />
                : <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        zoomEnabled={zoom}
                        zoomControlEnabled={zoom}
                        onRegionChangeComplete={regionHandlers.change}
                        initialRegion={initialRegion}
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
                    {showCurrentLocationMarker &&
                        <TouchableOpacity style={styles.currentLocation} onPress={centerCurrentLocation}>
                            <MaterialIcons name="my-location" size={40} color="green" />
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
    );
};

// PropTypes
Map.propTypes = {
    data: PropTypes.object.isRequired,
    configuration: PropTypes.object
};

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
        bottom: ((fullHeight / 2) - 20)
    },
    currentLocation: {
        position: "absolute",
        left: (fullWidth - 50),
        bottom: 100
    }
});

export default Map;
export { useMap };