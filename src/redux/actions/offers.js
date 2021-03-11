import { firestoreDB } from '../../constants/Firebase';
import * as notificationsActions from './notifications';
import moment from 'moment';
import { ACTIVE, CONTRACTED, IN_PROGRESS, OFFERED } from '../../utils/constantsStatusOffers';

export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';
export const REALIZE_OFFER = 'REALIZE_OFFER';
export const OFFER_SELECTED = 'OFFER_SELECTED';

export const showActiveOffers = (
  driverId,
  dayActivate,
  currentAddress,
  ruralServiceDestinyAddress,
) => dispatch => {
  const currentCity = currentAddress.split(',')[0];
  const destinyCity = ruralServiceDestinyAddress && ruralServiceDestinyAddress.split(',')[0];

  const data = firestoreDB
    .collection("OffersNotificationCenter");
  data.onSnapshot((allOffers) => {
    const offersData = [];
    allOffers.forEach((offer) => {
      if (
        offer.data().status === ACTIVE || offer.data().status === IN_PROGRESS &&
        moment(dayActivate).format('DD/MM/YYYY') === offer.data().pickUpDate &&
        currentCity === offer.data().currentCity
      ) {
        if (!offer.data().offerValue || offer.data().offerValue === '') {
          offersData.push({
            ...offer.data(),
            offerId: offer.id,
            response: {
              message: 'Nadie ha ofertado',
              status: 'INFO',
            }
          });
        } else {
          if (offer.data().driverId === driverId) {
            if (offer.data().status === IN_PROGRESS) {
              offersData.push({
                ...offer.data(),
                offerId: offer.id,
                response: {
                  message: 'Usted ha ofertado satisfactoriamente por',
                  status: IN_PROGRESS,
                }
              });
            } else {
              offersData.push({
                ...offer.data(),
                offerId: offer.id,
                response: {
                  message: 'Se te ha asignado la oferta',
                  status: CONTRACTED,
                }
              });
            }
          } else {
            offersData.push({
              ...offer.data(),
              offerId: offer.id,
              response: {
                message: 'Alguien ha ofertado por',
                status: IN_PROGRESS,
              }
            });
          }

        }
      }
    });

    dispatch({
      type: SHOW_ACTIVE_OFFERS,
      offers: offersData
    });
  });
};

export const showActiveOffersAsync = async (
  driverId,
  dayActivate,
) => {
  const data = firestoreDB
    .collection("OffersNotificationCenter");

  data.onSnapshot((allOffers) => {
    const offersData = [];
    allOffers.forEach((offer) => {
      if (
        offer.data().status === ACTIVE || offer.data().status === IN_PROGRESS &&
        moment(dayActivate).format('DD/MM/YYYY') === offer.data().pickUpDate
      ) {
        if (!offer.data().offerValue || offer.data().offerValue === '') {
          offersData.push({
            ...offer.data(),
            offerId: offer.id,
            response: {
              message: 'Nadie ha ofertado',
              status: 'INFO',
            }
          });
        } else {
          if (offer.data().driverId === driverId) {
            if (offer.data().status === IN_PROGRESS) {
              offersData.push({
                ...offer.data(),
                offerId: offer.id,
                response: {
                  message: 'Usted ha ofertado satisfactoriamente por',
                  status: IN_PROGRESS,
                }
              });
            } else {
              offersData.push({
                ...offer.data(),
                offerId: offer.id,
                response: {
                  message: 'Se te ha asignado la oferta',
                  status: CONTRACTED,
                }
              });
            }
          } else {
            offersData.push({
              ...offer.data(),
              offerId: offer.id,
              response: {
                message: 'Alguien ha ofertado por',
                status: IN_PROGRESS,
              }
            });
          }
        }
      }
    });

    dispatch({
      type: SHOW_ACTIVE_OFFERS,
      offers: offersData
    });
  });
};

export const getOfferValueById = async (offerId) => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();

  const { offerValue, dateStarted } = await data.then(doc => doc.data());

  return { changeOfferValue: offerValue, dateStarted };
};

export const getOfferById = async (offerId) => {
  const dataOffer = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();

  const {
    currentAddress,
    currentCity,
    description,
    destinationAddress,
    destinationCity,
    pickUpDate,
    status,
    userId,
    timesOffered,
  } = await dataOffer.then(doc => doc.data());

  const userData = firestoreDB
    .collection('Users')
    .doc(userId)
    .get();

  const { numberId } = await userData.then(doc => doc.data());

  return {
    currentAddress,
    currentCity,
    description,
    destinationAddress,
    destinationCity,
    pickUpDate,
    status,
    userId,
    timesOffered,
    numberId,
  }
};

export const changeOfferState = async (offerId, status) => {
  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    status,
  });

  return await updateData.then(() => true).catch(() => false);
};

export const addHistoryOffer = async (offerId, driverId, newOfferValue) => {
  const data = firestoreDB
    .collection('HistoryOffersNotificationCenter')
    .doc(`${offerId}_${driverId}`)
    .get();

  const doc = await data.then(doc => doc.exists).catch(() => false);

  if (doc) {
    const updateData = firestoreDB.collection('HistoryOffersNotificationCenter').doc(`${offerId}_${driverId}`).update({
      offerValue: newOfferValue,
      dateOffered: Date.now(),
      status: CONTRACTED,
    });

    return await updateData.then(() => true).catch(() => false);
  } else {
    const getOfferData = await getOfferById(offerId);
    if (getOfferData) {
      firestoreDB
        .collection('HistoryOffersNotificationCenter')
        .doc(`${offerId}_${driverId}`)
        .set({
          ...getOfferData,
          driverId,
          offerId,
          offerValue: newOfferValue,
          dateOffered: Date.now(),
          status: OFFERED,
        });
    }
    return true;
  }
};

export const realizeOffer = (offerId, newOfferValue, offerDriverId, index, driverUser) => async dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();
  const { offerValue, status, userId, timesOffered } = await data.then(doc => doc.data());

  let response = '';
  let finalValue = offerValue && offerValue !== null && offerValue !== ''
    ? offerValue
    : newOfferValue;

  finalValue = parseInt(finalValue) > parseInt(newOfferValue)
    ? newOfferValue
    : finalValue;

  if (status === ACTIVE) {

    offerValue === '' && changeOfferState(offerId, IN_PROGRESS);

    const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
      driver: {
        name: driverUser.name,
        phone: driverUser.phone,
      },
      driverId: offerDriverId,
      offerValue: finalValue,
      timesOffered: 1,
      dateStarted: moment().format("DD/MM/YYYY HH:mm:ss"),
      dateOffered: Date.now(),
      status: IN_PROGRESS,
    });

    const responseUpdateData = updateData.then(() => true).catch(() => false);

    response = {
      message: responseUpdateData
        ? 'Usted ha ofertado satisfactoriamente por'
        : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
      status: responseUpdateData ? 'OK' : 'CANCEL',
    };

  } else if (status === IN_PROGRESS) {

    const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
      driverId: offerDriverId,
      driver: {
        name: driverUser.name,
        phone: driverUser.phone,
      },
      offerValue: finalValue,
      timesOffered: timesOffered + 1,
      dateOffered: Date.now(),
      status: IN_PROGRESS,
    });

    const responseUpdateData = updateData.then(() => true).catch(() => false);

    response = {
      message: responseUpdateData
        ? 'Usted ha ofertado satisfactoriamente por'
        : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
      status: responseUpdateData ? 'OK' : 'CANCEL',
    };

    offerValue !== '' && notificationsActions.createOfferNotificationForUser(userId, offerId);
  }

  dispatch({
    type: REALIZE_OFFER,
    offerId,
    offerValue: finalValue,
    index,
    response,
  });
};

export const finalizeOfferState = async (offerId) => {
  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    status: 'DONE',
  });
  const result = [];
  await updateData.then(() => result.push(true)).catch(() => result.push(false));
  return result[0];
};

export const saveOfferSelected = (offerId, id) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    userId,
    driverId,
  } = await data.then((doc) => doc.data());

  const userData = firestoreDB
    .collection("Users")
    .doc(userId)
    .get();

  const {
    name,
    phone
  } = await userData.then((doc) => doc.data());

  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        notificationId: id,
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        driverId,
        userId,
        user: {
          id: userId,
          name,
          phone,
        },
      },
    });
  }
};

export const saveResumeOfferSelected = (offerId, id) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    description,
    userId,
    contact,
    phone,
    driverId,
  } = await data.then((doc) => doc.data());

  const userData = firestoreDB
    .collection("Users")
    .doc(userId)
    .get();

  const responseUserData = await userData.then((doc) => doc.data());

  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        notificationId: id,
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        description,
        contact,
        phone,
        userId,
        driverId,
        user: {
          id: userId,
          name: responseUserData.name,
          phone: responseUserData.phone,
        },
      },
    });
  }
};

export const cancelOffer = (offerId, notificationId) => async dispatch => {

  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    driver: {},
    driverId: '',
    offerValue: '',
    dateOffered: '',
    status: ACTIVE,
  });

  const responseUpdateData = updateData.then(() => true).catch(() => false);

  const notificationIdData = firestoreDB.collection("NotificationsDriver").doc(notificationId).get();

  const notificationDriverId = [];
  await notificationIdData.then((doc) => notificationDriverId.push(doc.id));

  return firestoreDB.collection("NotificationsDriver")
    .doc(notificationDriverId[0])
    .delete().then(() => {
      return true;
    }).catch((error) => {
      return false;
    });
};
