import { firestoreDB } from '../../constants/Firebase';

export const SHOW_TRIPS_IN_PROGRESS = 'SHOW_TRIPS_IN_PROGRESS';
export const SHOW_TRIPS_MADE = 'SHOW_TRIPS_MADE';

export const getTripsInProgressByDriverId = async (driverId) => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();

  const { offerValue } = await data.then(doc => doc.data());

  return offerValue;
};

export const getTripsMadeByDriverId = async (driverId) => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();

  const { offerValue } = await data.then(doc => doc.data());

  return offerValue;
};