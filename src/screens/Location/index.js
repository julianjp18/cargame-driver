
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'
import { Input } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import Map, { useMap } from '../../components/UI/Map';
import { TouchableOpacity } from 'react-native-gesture-handler';

const latitudeDelta = 0.00522,
    longitudeDelta = Dimensions.get("window").width / Dimensions.get("window").height * 0.00522

const region = {
    latitudeDelta,
    longitudeDelta,
    latitude: 40.416775,
    longitude: -3.703790
}

const PlaceInput = ({ style }) => {

    const [value, setValue] = useState('');
    return (
        <>
            <Input
                value={value}
                onChangeText={setValue}
                containerStyle={inputStyles.container}
                inputContainerStyle={inputStyles.inputContainer}
                placeholder="Busqueda..."
            />
        </>
    )
};

const inputStyles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 100
    },
    inputContainer: {
        margin: 0,
        fontFamily: 'Quicksand',
        fontSize: 10,
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        height: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'transparent'
    }
});

const LocationInput = ({ handleEvent }) => {

    return (
        <View style={locationStyles.container}>
            <PlaceInput />
            <TouchableOpacity style={locationStyles.iconContainer} onPress={handleEvent}>
                <Entypo name="location" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const locationStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        height: 50,
        top: 30,
        left: 0,
        right: 0,
        justifyContent: 'center',
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
        alignItems: 'flex-end'
    }
});

const Location = () => {

    const data = useMap({ region });

    const setMarker = () => {
        data.markers.handlers.add('origin', { coordinate: data.region.data })
    }

    return (
        <>
            <Map
                data={data}
                configuration={{ zoom: true, showCenterMarker: true }}
            />
            <LocationInput handleEvent={setMarker} />
        </>
    )
};

export default Location;