
import React from 'react';
import { Dimensions } from 'react-native'
import Map, { useMap } from '../../components/UI/Map';

const latitudeDelta = 0.00522,
    longitudeDelta = Dimensions.get("window").width / Dimensions.get("window").height * 0.00522

const region = {
    latitudeDelta,
    longitudeDelta,
    latitude: 40.416775,
    longitude: -3.703790
}

const markers = [
    {
        coordinate: {
            latitude: 40.416775,
            longitude: -3.703790
        }
    },
    {
        coordinate: {
            latitude: 40.393540,
            longitude: -3.755470
        }
    },
]
const Location = () => {

    const [data, handlers] = useMap({ region, markers });
    return (
        <Map
            data={data}
            handlers={handlers}
            configuration={{ zoom: true, showCenterMarker: true }}
        />
    )
};

export default Location;