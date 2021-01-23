/**
 * Componente Input de busqueda de lugares
 * 
 */

// Dependencias
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Hooks
import useCurrentLocation from '../../../hooks/useCurrentPosition';

// Configuración
import ENV from '../../../../env';

/**
 * Componente Input de busqueda de lugares
 * 
 * @param {String} [address]        Dirección a mostrar en el componente
 * @param {Function} handleEvent    Manejador del evento al seleccionar una dirección 
 * @param {Function} leftComponent  Componente izquierdo
 * @param {Function} rightComponent Componente derecho
 */
const SearchPlace = ({ address, handleEvent, leftComponent, rightComponent }) => {

    // Obtiene la ubicación actual
    const currentPosition = useCurrentLocation();

    // Referencia del buscador
    const seachRef = useRef();

    // Efecto para actualizar la dirección en el Input
    useEffect(() => {
        if (address && address.length > 0 && seachRef.current) {
            seachRef.current.setAddressText(address);
        }
    }, [address]);

    if (!currentPosition) { return null; }

    return (
        <GooglePlacesAutocomplete
            ref={seachRef}
            placeholder="Busqueda..."
            minLength={2}
            styles={styles}
            returnKeyType='search'
            renderLeftButton={leftComponent}
            renderRightButton={rightComponent}
            onPress={handleEvent}
            predefinedPlaces={[
                {
                    description: currentPosition.address,
                    geometry: { location: currentPosition.location }
                }]}
            query={{
                key: ENV.googleApiKey,
                language: "es"
            }}
            debounce={200}
            fetchDetails
        />
    );
}

// PropTypes
SearchPlace.propTypes = {
    address: PropTypes.string,
    handleEvent: PropTypes.func,
    leftComponent: PropTypes.func,
    rightComponent: PropTypes.func
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 16,
    },
    description: {
        fontWeight: 'bold',
    }
});
export default SearchPlace;