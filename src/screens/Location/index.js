/**
 * Contenedor Mapa y ubicación
 * 
 */

//  Dependencias
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Componentes
import Map, { useMap } from '../../components/UI/Map';
import SearchPlace from '../../components/UI/Map/SearchPlace';

// Utils
import { getAdressFromLocation } from '../../utils/location';

// Estilos
import { fullWidth } from '../../styles/layout';
import { accentColor } from '../../constants/Colors';

/**
 * Componente Input de busqueda de lugares
 * 
 * @param {String} address  Dirección actual
 * @param {Object} handlers Funciones manejadoras de ventos
 */
const LocationInput = ({ label, address, handlers }) => {

    // Componente para regresar al Home
    const leftComponent = () => (
        <TouchableOpacity
            style={{ ...locationStyles.iconContainer, ...locationStyles.borderRight }}
            onPress={handlers.goBack} >
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
            <View style={locationStyles.labelContainer}>
                <Text style={locationStyles.label}>
                    {label}
                </Text>
            </View>
            <View style={locationStyles.searchContainer}>
                <SearchPlace
                    address={address}
                    handleEvent={handlers.placeSearch}
                    leftComponent={leftComponent}
                    rightComponent={rightComponent}
                />
            </View>
        </View>
    );
};
// Estilos
const locationStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 25,
        left: 0,
        right: 0,
    },
    labelContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 95,
        backgroundColor: accentColor,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20
    },
    label: {
        position: 'absolute',
        width: fullWidth,
        color: 'white',
        textAlign: 'center'
    },
    searchContainer: {
        position: 'absolute',
        top: 25,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20
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

    const {
        handleEvent: locationHandler,
        label,
        data: _initialData
    } = navigation.state.params;

    // Hook con datos del mapa
    const data = useMap({
        region: _initialData.location,
        markers: _initialData.location
            ? { A: { location: _initialData.location } }
            : undefined
    });

    // Estado para la dirección a mostrar, cuando se utilizan
    // Marcadores se actualiza con éste estado
    const [address, setAddress] = useState(_initialData.address || '');

    // Efecto para reubicar el mapa en la ubicación actual al obtenerla
    useEffect(() => {
        if (!data.relocate.data && data.currentPosition.data) {
            data.relocate.handlers.setRelocation(
                data.currentPosition.data.location
            );
        }
    }, [data.currentPosition]);

    // Manejadores
    const handlers = {
        /**
         * Función que maneja la busqueda de un lugar
         * 
         * @param {Object} location Ubicación
         * @param {String} address  Dirección
         */
        placeSearch: ({ location, address }) => {
            data.markers.handlers.add('A', { location, title: address, color: accentColor });
            data.relocate.handlers.setRelocation(location);
            // Agrega el lugar
            locationHandler({ location, address });
        },
        /**
         * Agrega marcadores en la ubicación actual del mapa
         */
        marker: async () => {
            // Obtiene la ubicación
            const location = data.region.data;
            // Obtiene la dirección de la ubicación
            const address = await getAdressFromLocation(location);
            // Agrega el marcador
            data.markers.handlers.add('A', { location, title: address, color: accentColor });
            if (address) {
                // Agrega el lugar
                locationHandler({ location, address });
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
            <LocationInput address={address} label={label} handlers={handlers} />
        </>
    )
};
// PropTypes
Location.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default Location;