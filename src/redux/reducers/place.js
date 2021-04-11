import {
  GET_CURRENT_POSITION,
  SET_ORIGIN_LOCATION,
  SET_DESTINATION_LOCATION,
  CHANGE_FIELD_SELECTED,
  ACTIVATE_SERVICE,
  DEACTIVATE_SERVICE,
  VERIFY_ACTIVATION_SERVICE
} from "../actions/places";

const initialState = {
  dayActivate: null,
  origin: null,
  destination: null,
  status: null,
  serviceType: null,
  currentPosition: null,
  typeFieldSelected: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIGIN_LOCATION:
      return {
        ...state,
        origin: {
          address: action.payload.address,
          location: action.payload.location,
          city: action.payload.city
        }
      };
    case SET_DESTINATION_LOCATION:
      return {
        ...state,
        destination: {
          address: action.payload.address,
          location: action.payload.location,
          city: action.payload.city
        }
      };
    case CHANGE_FIELD_SELECTED:
      return {
        ...state,
        typeFieldSelected: action.typeFieldSelected,
      };

    case VERIFY_ACTIVATION_SERVICE:
    case ACTIVATE_SERVICE:
      return {
        ...state,
        serviceType: action.payload.serviceType,
        dayActivate: action.payload.dayActivate,
        origin: action.payload.origin,
        destination: action.payload.destination,
        status: action.payload.status,
      };
    case DEACTIVATE_SERVICE:
      return {
        ...state,
        dayActivate: '',
        status: action.payload,
      }
    case GET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: {
          latitude: action.latitude,
          longitude: action.longitude,
        },
      };
    default:
      return state;
  }
};
