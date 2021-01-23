/**
 * Componente Mapa
 */

// Dependencias
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Tile } from 'react-native-elements';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Hooks
import useMap from './useMap';
import usePermission, { PERMISSIONS } from '../../../hooks/usePermission';

// Utils
import { getCurrentPosition } from '../../../utils/location';

// Configuración
import ENV from '../../../../env';

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
        region: { data: initialRegion, handlers: regionHandlers },
        markers: { data: markers, handlers: markersHandlers },
        directions: { data: directions, handlers: directionsHandlers },
        relocate: { data: relocate, handlers: relocateHandlers }
    } = data;

    const {
        zoom,
        showCenterMarker = true,
        showCurrentLocationMarker = true,
        defaultCurrentLocation = true,
        onDenyPermission: _onDenyPermission
    } = configuration;

    // Hook para comprobar permisos de ubicación
    const permission = usePermission(PERMISSIONS.LOCATION, onDenyPermission);

    // Efecto para localizar el mapa en la ubicación actual al abrir
    useEffect(() => {
        if (defaultCurrentLocation && !relocate && permission) {
            centerCurrentLocation();
        }
    }, [permission]);

    // Effecto para reubicar mapa
    useEffect(() => {
        if (relocate && mapRef.current) {
            mapRef.current.animateToRegion(relocate);
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
            const position = await getCurrentPosition();
            if (!position) { return; }
            mapRef.current.animateToRegion(position.coords);
        }
        catch (error) {
            // TODO: nfv => Gestionar error
        }
    }

    // Componente con Marcadores que se hayan agregado
    const Markers = () => markers
        ? Object.values(markers).map((marker, index) =>
            <Marker
                key={index}
                coordinate={marker.coordinate}
                pinColor={marker.color}
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

    return (
        <View style={styles.container}>
            { !permission
                ? <Tile
                    title="No se ha podido cargar el mapa"
                    featured
                    caption="Revisa los permisos"
                />
                : <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        zoomEnabled={zoom}
                        zoomControlEnabled={zoom}
                        onRegionChangeComplete={regionHandlers.change}
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