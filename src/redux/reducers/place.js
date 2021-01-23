import {
  GET_POSITION,
  GET_CURRENT_POSITION,
  GET_CURRENT_RURAL_SERVICE,
  CHANGE_FIELD_SELECTED,
  GET_DESTINY_RURAL_SERVICE,
  GET_ACTIVATION_URBAN_SERVICE,
  ACTIVATE_RURAL_SERVICE,
  ACTIVATE_URBAN_SERVICE,
  DEACTIVATE_URBAN_SERVICE,
  DEACTIVATE_RURAL_SERVICE,
} from "../actions/places";

const initialState = {
  dayActivate: null,
  currentAddress: null,
  currentCoords: null,
  activateUrbanService: false,
  activateRuralService: false,
  ruralServiceDestinyAddress: null,
  ruralServiceDestinyCoords: null,
  currentPosition: null,
  getPositionPicked: {
    address: "Por favor selecciona un punto dentro de una ciudad",
    latitude: null,
    longitude: null,
    status: "ZERO_RESULTS",
  },
  typeFieldSelected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITION:
      return {
        ...state,
        getPositionPicked: action.getPositionPicked,
      };
    case GET_CURRENT_RURAL_SERVICE:
      return {
        ...state,
        currentAddress: action.address,
        currentCoords: action.location,
      };
    case GET_DESTINY_RURAL_SERVICE:
      return {
        ...state,
        ruralServiceDestinyAddress: action.address,
        ruralServiceDestinyCoords: action.location,
      };
    case CHANGE_FIELD_SELECTED:
      return {
        ...state,
        typeFieldSelected: action.typeFieldSelected,
      };
    case GET_ACTIVATION_URBAN_SERVICE:
      return {
        ...state,
        currentAddress: action.address,
        currentCoords: action.location,
      };
    case ACTIVATE_URBAN_SERVICE:
      return {
        ...state,
        dayActivate: action.date,
        urbanCurrentAddress: action.currentAddress,
        activateUrbanService: true,
      };
    case ACTIVATE_RURAL_SERVICE:
      return {
        ...state,
        dayActivate: action.date,
        ruralCurrentAddress: action.currentAddress,
        ruralDestinyAddress: action.ruralServiceDestinyAddress,
        activateRuralService: true,
      };
    case DEACTIVATE_URBAN_SERVICE:
      return {
        ...state,
        dayActivate: null,
        activateUrbanService: false,
      };
    case DEACTIVATE_RURAL_SERVICE:
      return {
        ...state,
        dayActivate: null,
        activateRuralService: false,
      };
    case GET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: {
          lat: action.latitude,
          lng: action.longitude,
        },
      };
    default:
      return state;
  }
};
