import { SHOW_TRIPS_IN_PROGRESS, SHOW_TRIPS_MADE } from "../actions/travels";

const initialState = {
  tripsInProgress: null,
  tripsMade: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TRIPS_IN_PROGRESS:
      return {
        ...state,
        tripsInProgress: action.tripsInProgress,
      };
    case SHOW_TRIPS_MADE:
      return {
        ...state,
        tripsMade: action.tripsMade,
      };
    default:
      return state;
  }
};