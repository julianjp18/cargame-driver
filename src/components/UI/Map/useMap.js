import { useState } from "react";

const useMarkers = (_data = {}) => {

    const [data, setData] = useState(_data);

    const handlers = {
        add: (name, newData) => {
            const { coordinate, color } = newData;
            setData({
                ...data,
                [name]: {
                    coordinate,
                    color
                }
            });
        },
        delete: (name) => {
            const newData = { ...data };
            delete newData[name];
            setData(newData);
        }
    };
    return [
        data,
        handlers
    ];
};

const useRegion = (_data = {}) => {

    const [data, setData] = useState(_data);

    const handlers = {
        change: (newData) => {
            const {
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
            } = newData;
            setData({
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
            });
        },
        // delete: (index) => {
        //     const newData = [...data].filter((d, i) => i !== index);
        //     setData(newData);
        // }
    };
    return [
        data,
        handlers
    ];
};

const useDirections = (_data = { origin: null, destination: null }) => {

    const [data, setData] = useState(_data);

    const handlers = {
        setOrigin: (origin, props) => {
            const { colors } = props
            setData({
                ...data,
                origin,
                colors
            });
        },
        setDestination: (destination, props) => {
            const { colors } = props
            setData({
                ...data,
                destination,
                colors
            });
        }
    };
    return [
        data,
        handlers
    ];
};

const useMap = (initialize = {}) => {
    const {
        region: _region,
        markers: _markers,
        directions: _directions
    } = initialize;

    const [region, regionHandlers] = useRegion(_region);
    const [markers, markerHandlers] = useMarkers(_markers);
    const [directions, directionHandlers] = useDirections(_directions);


    return {
        markers: { data: markers, handlers: markerHandlers },
        region: { data: region, handlers: regionHandlers },
        directions: { data: directions, handlers: directionHandlers }
    };
};

export default useMap;