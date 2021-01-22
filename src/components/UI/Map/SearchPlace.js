import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

import useCurrentLocation from '../../../hooks/useCurrentPosition';

const SearchPlace = ({ address, handleEvent, leftComponent, rightComponent }) => {
    console.log('SearchPlace: ', address);

    const currentPosition = useCurrentLocation();

    const seachRef = useRef();

    useEffect(() => {
        if (address && address.length > 0 && seachRef.current) {
            console.log('ENTRAAA');
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
            predefinedPlaces={[{ description: currentPosition.address, geometry: { location: currentPosition.location.coords } }]}
            query={{
                key: "AIzaSyAx3ZM1YpfTSiV4dennpgT3hiZcJ2959s8",
                language: "es"
            }}
            debounce={200}
            fetchDetails
        />
    );
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
    },
    field: {
        // height: 40,
        // margin: 15,
        // backgroundColor: '#fdfdf6',
        // padding: 10,
        // borderRadius: 50,
        // shadowColor: 'rgba(0, 0, 0, 0.1)',
        // shadowOpacity: 0.8,
        // elevation: 6,
        // shadowRadius: 15,
        // shadowOffset: { width: 1, height: 13 },
        // overflow: 'hidden'
    },
    textInput: {
        // color: '#00539b',
        fontSize: 16,
    },
    description: {
        fontWeight: 'bold',
    }
});
export default SearchPlace;