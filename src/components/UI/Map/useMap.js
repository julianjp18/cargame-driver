/**
 * Hooks para el mapa
 */

//  Dependencias
import { useState } from "react";

// Hooks
import useCurrentPosition from "../../../hooks/useCurrentPosition";

/**
 * Hook para los marcadores del mapa
 * 
 * @param {Object} [_data] Marcadores iniciales
 */
const useMarkers = (_data = {}) => {
    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Agrega un nuevo marcador normalizado por nombre
         * @param {String} name    Nombre/Clave del marcador
         * @param {Object} newData Datos del marcador
         */
        add: (name, newData) => {
            const { location, color, title, description } = newData;
            setData({
                ...data,
                [name]: {
                    location: { ...location },
                    color,
                    title,
                    description
                }
            });
        },
        /**
         * Elimina un marcador por su nombre
         * @param {String} name Nombre/Clave a eliminar
         */
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

/**
 * Hook para la región o la ubicación en el mapa
 * 
 * @param {Object} [_data] Región inicial
 */
const useRegion = (_data = null) => {

    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Actualiza la región actual
         * @param {Object} newData Datos de la región
         */
        change: (newData) => {
            const {
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
            } = newData;
            if (!data ||
                latitude !== data.latitude ||
                longitude !== data.longitude ||
                latitudeDelta !== data.latitudeDelta ||
                longitudeDelta !== data.longitudeDelta
            ) {
                setData({
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                });
            }
        }
    };
    return [
        data,
        handlers
    ];
};

/**
 * Hook para la dirección
 * 
 * @param {Object} [_data] Dirección inicial
 */
const useDirections = (_data = { origin: null, destination: null }) => {

    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Actualiza la ubicación de origen de la dirección
         * @param {Object} origin Datos de la ubicación de origen
         * @param {Object} props  Propiedades adicionales
         */
        setOrigin: (origin, props = {}) => {
            const { colors } = props
            setData({
                ...data,
                origin: { ...origin },
                colors
            });
        },
        /**
         * Actualiza la ubicación de destino de la dirección
         * @param {Object} destination Datos de la ubicación de origen
         * @param {Object} props       Propiedades adicionales
         */
        setDestination: (destination, props = {}) => {
            const { colors } = props
            setData({
                ...data,
                destination: { ...destination },
                colors
            });
        }
    };
    return [
        data,
        handlers
    ];
};

/**
 * Hook principal del mapa
 * 
 * @param {Object} [initialize] Datos de inicialización
 */
const useMap = (initialize = {}) => {
    const {
        region: _region,
        markers: _markers,
        directions: _directions
    } = initialize;

    // Hooks
    const [region, regionHandlers] = useRegion(_region);
    const [markers, markerHandlers] = useMarkers(_markers);
    const [directions, directionHandlers] = useDirections(_directions);
    const currentPosition = useCurrentPosition();

    const [relocate, setRelocation] = useState(null);

    return {
        markers: { data: markers, handlers: markerHandlers },
        region: { data: region, handlers: regionHandlers },
        directions: { data: directions, handlers: directionHandlers },
        relocate: { data: relocate, handlers: { setRelocation } },
        currentPosition: { data: currentPosition, handlers: {} }
    };
};

export default useMap;