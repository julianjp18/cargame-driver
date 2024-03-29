import { firestoreDB } from '../../constants/Firebase';

export const SHOW_TRIPS_IN_PROGRESS = 'SHOW_TRIPS_IN_PROGRESS';
export const SHOW_TRIPS_MADE = 'SHOW_TRIPS_MADE';
export const SHOW_TRIP_SELECTED = 'SHOW_TRIP_SELECTED';

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
        trips.push({...trip.data(), offerId: trip.id});
      }
    });
  });

  dispatch({
    type: SHOW_TRIPS_IN_PROGRESS,
    tripsInProgress: trips
  });
};

export const getTripsMadeByDriverId = (driverId) => dispatch => {

  const offersDoneData = firestoreDB
  .collection('OffersNotificationCenter')
  .get();

  const trips = [];
  offersDoneData.then((tripsMade) => {
    
    tripsMade.forEach(trip => {
        if (
          trip.data().driverId === driverId &&
          trip.data().status === "DONE"
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

export const saveTripSelected = (tripInProgress) => dispatch => {
  dispatch({
    type: SHOW_TRIP_SELECTED,
    tripSelected: tripInProgress,
  });
};

export const getUserById = async (userId) => {
  const data = firestoreDB
    .collection('Users')
    .doc(userId)
    .get();
  const { name, phone } = await data.then(doc => doc.data());

  return { name, phone };
};
