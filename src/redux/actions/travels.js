import { firestoreDB } from '../../constants/Firebase';

export const SHOW_TRIPS_IN_PROGRESS = 'SHOW_TRIPS_IN_PROGRESS';
export const SHOW_TRIPS_MADE = 'SHOW_TRIPS_MADE';

export const getTripsInProgressByDriverId = (driverId) => dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .get();

  const trips = [];
  data.then((tripsInProgress) => {
    tripsInProgress.forEach(trip => {
      if (
        trip.data().driverId === driverId &&
        trip.data().status === "IN_PROGRESS"
      ) {
        trips.push(trip.data());
      }
    });
  });

  dispatch({
    type: SHOW_TRIPS_IN_PROGRESS,
    tripsInProgress: trips
  });
};

export const getTripsMadeByDriverId = async (driverId) => dispatch => {
  const data = firestoreDB
  .collection('HistoryOffersNotificationCenter')
  .get();

  const trips = [];
  data.then((tripsMade) => {
    tripsMade.forEach(trip => {
        if (
          trip.data().driverId === driverId ||
          trip.data().status === "CONTRACTED"
        ) {
          trips.push(trip.data());
        }
    });
  });

  dispatch({
    type: SHOW_TRIPS_MADE,
    tripsMade: trips
  });
};