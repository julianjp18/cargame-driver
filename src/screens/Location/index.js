
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'
import { Input } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Map, { useMap } from '../../components/UI/Map';
import SearchPlace from '../../components/UI/Map/SearchPlace';
import { TouchableOpacity } from 'react-native-gesture-handler';

import usePlace from './usePlace';

import { getAdressFromLocation } from '../../utils/location';

const latitudeDelta = 0.00522,
    longitudeDelta = Dimensions.get("window").width / Dimensions.get("window").height * 0.00522

const LocationInput = ({ address, handlers }) => {
    const leftComponent = () => (
        <TouchableOpacity style={{ ...locationStyles.iconContainer, ...locationStyles.borderRight }} onPress={handlers.goBack} >
            <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
    );
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
        // backgroundColor:'green',
        alignItems: 'center',
        borderRightColor: 'gray',
    },
    borderRight: {
        borderRightWidth: 1
    }
});

const Location = ({ navigation }) => {

    const data = useMap({});

    const [, { dispatchSetOrigin }] = usePlace();

    const handlers = {
        placeSearch: (place, details) => {

            const coordinate = place && place.geometry
                ? place.geometry.location
                : details && details.geometry
                    ? {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                    }
                    : null;
            if (!coordinate) { return; }
            data.markers.handlers.add('origin', { coordinate });
            data.relocate.handlers.setRelocation(coordinate);
        },
        marker: async () => {
            const coordinate = data.region.data;
            data.markers.handlers.add('origin', { coordinate });
            dispatchSetOrigin({ coordinate, address: 'Av Siempre Viva' });
            data.directions.handlers.setOrigin(data.region.data);

            const address = await getAdressFromLocation(coordinate);
            if (address) {
                data.address.handlers.setAddress(address);
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
            <LocationInput address={data.address.data} handlers={handlers} />
        </>
    )
};

export default Location;