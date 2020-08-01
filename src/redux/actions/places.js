import ENV from '../../../env';
import { URBAN_SERVICE } from '../../constants/Utils';

export const GET_POSITION = 'GET_POSITION';
export const GET_CURRENT_RURAL_SERVICE = 'GET_CURRENT_RURAL_SERVICE';
export const CHANGE_FIELD_SELECTED = 'CHANGE_FIELD_SELECTED';
export const GET_DESTINY_RURAL_SERVICE = 'GET_DESTINY_RURAL_SERVICE';
export const GET_ACTIVATION_URBAN_SERVICE = 'GET_ACTIVATION_URBAN_SERVICE';
export const ACTIVATE_RURAL_SERVICE = 'ACTIVATE_RURAL_SERVICE';
export const ACTIVATE_URBAN_SERVICE = 'ACTIVATE_URBAN_SERVICE';
export const DEACTIVATE_URBAN_SERVICE = 'DEACTIVATE_URBAN_SERVICE';
export const DEACTIVATE_RURAL_SERVICE = 'DEACTIVATE_RURAL_SERVICE';

export const getPosition = (location) => async dispatch => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    location.lat
    },${location.lng}&key=${ENV.googleApiKey}`)

  if (!response.ok) {
    throw new Error('¡UPS! Error al conseguir la dirección');
  }

  const responseData = await response.json();

  if (!responseData.results) {
    return;
  }

  dispatch({
    type: GET_POSITION,
    getPositionPicked: {
      lat: location.lat,
      lng: location.lng,
      address: responseData.results[0].formatted_address
    }
  });

  return {
    lat: location.lat,
    lng: location.lng,
    address: responseData.results[0].formatted_address
  };
};

export const savePosition = (location, typeFieldSelected) => dispatch => {
  let action;

  switch (typeFieldSelected) {
    case 'isOriginCityTruckService':
      action = GET_CURRENT_RURAL_SERVICE;
      break;
    case 'isDestinyCityTruckService':
      action = GET_DESTINY_RURAL_SERVICE;
      break;
    case 'isActivationCityTruckService':
      action = GET_ACTIVATION_URBAN_SERVICE;
      break;
    default:
      action = '';
      break;
  }

  dispatch({
    type: action,
    coords: {
      lat: location.latitude,
      lng: location.longitude,
    },
    address: location.address
  });
};

export const changeFieldSelected = (typeFieldSelected) => dispatch => {
  dispatch({
    type: CHANGE_FIELD_SELECTED,
    typeFieldSelected,
  });
};

export const activateService = (date, typeService) => dispatch => {
  if(typeService === URBAN_SERVICE) {
    dispatch({
      type: ACTIVATE_URBAN_SERVICE,
      date,   
    });
  } else {
    dispatch({
      type: ACTIVATE_RURAL_SERVICE,
      date,
    });
  }
};

export const deactivateService = (date, typeService) => dispatch => {
  if(typeService === URBAN_SERVICE) {
    dispatch({ type: DEACTIVATE_URBAN_SERVICE });
  } else {
    dispatch({ type: DEACTIVATE_RURAL_SERVICE });
  }
};
