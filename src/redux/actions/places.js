import { URBAN_SERVICE, STATUS } from '../../constants/Utils';

import * as Firebase from '../../services/firebase';
import { COLLECTIONS } from '../../services/firebase/constants';
import { parseToGeoPoint } from '../../services/firebase/utils';

export const GET_CURRENT_POSITION = 'GET_CURRENT_POSITION';
export const SET_ORIGIN_LOCATION = 'SET_ORIGIN_LOCATION';
export const CHANGE_FIELD_SELECTED = 'CHANGE_FIELD_SELECTED';
export const SET_DESTINATION_LOCATION = 'SET_DESTINATION_LOCATION';
export const ACTIVATE_SERVICE = 'ACTIVATE_SERVICE';
export const DEACTIVATE_SERVICE = 'DEACTIVATE_SERVICE';

const COLLECTION = COLLECTIONS.DRIVER_LOCATION;

export const setOriginLocation = (payload) => {
  return {
    type: SET_ORIGIN_LOCATION,
    payload
  };
}

export const setDestinationLocation = (payload) => {
  return {
    type: SET_DESTINATION_LOCATION,
    payload
  };
}

export const currentPosition = (location) => dispatch => {

  dispatch({
    type: GET_CURRENT_POSITION,
    latitude: location.latitude,
    longitude: location.longitude,
  });
};

export const changeFieldSelected = (typeFieldSelected) => dispatch => {
  dispatch({
    type: CHANGE_FIELD_SELECTED,
    typeFieldSelected,
  });
};

export const activateService = (payload) => dispatch => {

  const {
    driverId,
    origin,
    destination,
    serviceType,
    dayActivate
  } = payload;

  const status = STATUS.ACTIVE;
  payload.status = status;

  const newData = {
    driverId,
    originLocation: parseToGeoPoint(origin.location),
    originAddress: origin.address,
    originCity: origin.city,
    destinationLocation: serviceType !== URBAN_SERVICE && destination ? parseToGeoPoint(destination.location) : null,
    destinationAddress: serviceType !== URBAN_SERVICE && destination ? destination.address : null,
    destinationCity: serviceType !== URBAN_SERVICE && destination ? destination.city : null,
    serviceType,
    dayActivate,
    status
  };

  Firebase.findOneAndUpdate(
    COLLECTION,
    { key: 'driverId', value: newData.driverId },
    newData
  );

  dispatch({
    type: ACTIVATE_SERVICE,
    payload
  })
};

export const deactivateService = (driverId) => dispatch => {

  Firebase.findOneAndUpdate(
    COLLECTION,
    { key: 'driverId', value: driverId },
    { status: STATUS.DESACTIVE }
  );
  dispatch({
    type: DEACTIVATE_SERVICE,
    payload: STATUS.DESACTIVE
  })
};
