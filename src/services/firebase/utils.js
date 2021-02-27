import { GeoPoint } from '../../constants/Firebase';

/**
 * Convierte las coordenadas a GeoPoint de Firebase
 * @param {Number} longitude 
 * @param {Number} latitude 
 */
export const parseToGeoPoint = ({ longitude, latitude }) => {
    return new GeoPoint(longitude, latitude);
}