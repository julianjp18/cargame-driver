import {
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
  getPositionPicked: null,
  typeFieldSelected: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_CURRENT_RURAL_SERVICE:
        return {
          ...state,
          currentAddress: action.address,
          currentCoords: action.coords,
        };
      case GET_DESTINY_RURAL_SERVICE:
        return {
          ...state,
          ruralServiceDestinyAddress: action.address,
          ruralServiceDestinyCoords: action.coords,
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
          currentCoords: action.coords,
        };
      case ACTIVATE_URBAN_SERVICE:
        return {
          ...state,
          dayActivate: action.date,
          activateUrbanService: true,
        };
      case ACTIVATE_RURAL_SERVICE:
        return {
          ...state,
          dayActivate: action.date,
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
      default:
        return state;
    }
};