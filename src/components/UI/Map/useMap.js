import { useState } from "react";

const useMap = (initialize) => {

    const {
        region: _region,
        markers: _markers
    } = initialize;

    const [region, setRegion] = useState(_region);
    const [markers, setMarkers] = useState(_markers);

    const onChangeRegion = ({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    }) => {
        console.log('onChangeRegion: ');
        setRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        });
    };

    return [
        {
            region,
            markers
        },
        {
            onChangeRegion
        }
    ];
};

export default useMap;