import { SHOW_TRIPS_IN_PROGRESS, SHOW_TRIPS_MADE } from "../actions/offers";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TRIPS_IN_PROGRESS:
      return {
        tripsInProgress: action.tripsInProgress,
      };
    case SHOW_TRIPS_MADE:
      return {
        tripsMade: action.tripsMade,
      };
    default:
      return state;
  }
};