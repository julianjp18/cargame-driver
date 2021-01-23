/**
 * Contenedor Mapa y ubicación
 * 
 */

//  Dependencias
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Componentes
import Map, { useMap } from '../../components/UI/Map';
import SearchPlace from '../../components/UI/Map/SearchPlace';

// Hooks
import usePlace from './usePlace';

// Utils
import { getAdressFromLocation } from '../../utils/location';

/**
 * Componente Input de busqueda de lugares
 * 
 * @param {String} address  Dirección actual
 * @param {Object} handlers Funciones manejadoras de ventos
 */
const LocationInput = ({ address, handlers }) => {

    // Componente para regresar al Home
    const leftComponent = () => (
        <TouchableOpacity style={{ ...locationStyles.iconContainer, ...locationStyles.borderRight }} onPress={handlers.goBack} >
            <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
    );

    // Componente para ubicar marca
    const rightComponent = () => (
        <TouchableOpacity style={locationStyles.iconContainer} onPress={handlers.marker}>
            <Entypo name="location" size={30} color="black" />
        </TouchableOpacity>
    );

    return (
        <View style={locationStyles.container}>
            <SearchPlace
                address={address}
                handleEvent={handlers.placeSearch}
                leftComponent={leftComponent}
                rightComponent={rightComponent}
            />
        </View>
    );
};
// Estilos
const locationStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        // height: 500,
        top: 30,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: 'gray',
    },
    borderRight: {
        borderRightWidth: 1
    }
});
// PropTypes
LocationInput.propTypes = {
    address: PropTypes.string,
    handlers: PropTypes.object.isRequired,
};

/**
 * Componente principal
 * 
 * @param {Object} navigation Objeto de navegación
 */
const Location = ({ navigation }) => {

    // Hook con datos del mapa
    const data = useMap({});

    // Hook con datos de Redux
    const [, { dispatchSetOrigin }] = usePlace();
    // Estado para la dirección a mostrar, cuando se utilizan
    // Marcadores se actualiza con éste estado
    const [address, setAddress] = useState(null);

    // Manejadores
    const handlers = {
        /**
         * Función que maneja la busqueda de un lugar
         * 
         * @param {Object} place   Datos del lugar
         * @param {Object} details Detalles del lugar
         */
        placeSearch: (place, details) => {

            // Obtiene la ubicación del lugar
            const coordinate = place && place.geometry
                ? place.geometry.location
                : details && details.geometry
                    ? {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                    }
                    : null;
            if (!coordinate) { return; }
            // Agrega un marcador del origen
            data.markers.handlers.add('origin', { coordinate });
            data.relocate.handlers.setRelocation(coordinate);
        },
        /**
         * Agrega marcadores en la ubicación actual del mapa
         */
        marker: async () => {
            // Obtiene la ubicación
            const coordinate = data.region.data;
            // Agrega el marcador
            data.markers.handlers.add('origin', { coordinate });
            // Obtiene la dirección de la ubicación
            const address = await getAdressFromLocation(coordinate);
            if (address) {
                // Agrega el lugar
                dispatchSetOrigin({ coordinate, address });
                // Actualiza la dirección
                setAddress(address);
            }
        },
        goBack: () => {
            navigation.navigate('HomeDriver');
        }
    };

    return (
        <>
            <Map
                data={data}
                configuration={{ zoom: true, showCenterMarker: true }}
            />
            <LocationInput address={address} handlers={handlers} />
        </>
    )
};
// PropTypes
Location.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default Location;