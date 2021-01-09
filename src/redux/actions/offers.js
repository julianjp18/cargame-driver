import { firestoreDB } from '../../constants/Firebase';
import * as notificationsActions from './notifications';

export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';
export const REALIZE_OFFER = 'REALIZE_OFFER';
export const OFFER_SELECTED = 'OFFER_SELECTED';

export const showActiveOffers = () => dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter");
  
  data.onSnapshot((allOffers) => {
    const offersData = [];
    allOffers.forEach(offer => {
      if (offer.data().status === 'ACTIVE' || offer.data().status === 'IN_PROGRESS') {
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
          offersData.push({
            ...offer.data(),
            offerId: offer.id,
            response: {
              message: 'Usted ha ofertado satisfactoriamente por',
              status: 'IN_PROGRESS',
            }
          });
        }
      }
    });

    console.log(offersData);

    dispatch({
      type: SHOW_ACTIVE_OFFERS,
      offers: offersData
    });
  });
};

export const showActiveOffersAsync = async () => {
  const data = firestoreDB
    .collection("OffersNotificationCenter");

  const offersData = [];
  data.onSnapshot((allOffers) => {
    allOffers.forEach(offer => {
      if (offer.data().status === 'ACTIVE') {
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
          offersData.push({
            ...offer.data(),
            offerId: offer.id,
            response: {
              message: 'Han realizado una oferta por',
              status: 'OFFERED',
            }
          });
        }
      }
    });
  });

  return offersData;
};

export const getOfferValueById = async (offerId) => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();

  const { offerValue } = await data.then(doc => doc.data());

  return offerValue;
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
  } = await dataOffer.then(doc => doc.data());

  return {
    currentAddress,
    currentCity,
    description,
    destinationAddress,
    destinationCity,
    pickUpDate,
    status,
    userId
  }
};

const changeOfferState = async (offerId, status) => {
  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    status,
  });

  return await updateData.then(() => true).catch(() => false);
};

const addHistoryOffer = async (offerId, driverId, newOfferValue) => {
  const data = firestoreDB
    .collection('HistoryOffersNotificationCenter')
    .doc(`${offerId}_${driverId}`)
    .get();

  const doc = await data.then(doc => doc.exists).catch(() => false);

  if (doc) {
    const updateData = firestoreDB.collection('HistoryOffersNotificationCenter').doc(`${offerId}_${driverId}`).update({
      offerValue: newOfferValue,
      timesOffered: 2,
      dateOffered: Date.now(),
      status: 'CONTRACTED',
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
          timesOffered: 1,
          dateOffered: Date.now(),
          status: 'OFFERED',
        });
    }
    return true;
  }
};

export const realizeOffer = (offerId, newOfferValue, offerDriverId, index) => async dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();
  const { offerValue, status, driverId, userId } = await data.then(doc => doc.data());
  console.log(newOfferValue, offerValue, status, userId);
  let response = '';
  let finalValue = offerValue && offerValue !== null && offerValue !== ''
    ? offerValue
    : newOfferValue;

  finalValue = parseInt(finalValue) > parseInt(newOfferValue)
    ? newOfferValue
    : finalValue;

  if (status === 'ACTIVE') {

    offerValue === '' && changeOfferState(offerId, 'IN_PROGRESS');

    const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
      driverId: offerDriverId,
      offerValue: finalValue,
      dateOffered: Date.now(),
      status: 'IN_PROGRESS',
    });

    const responseUpdateData = updateData.then(() => true).catch(() => false);

    response = {
      message: responseUpdateData
        ? 'Usted ha ofertado satisfactoriamente por'
        : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
      status: responseUpdateData ? 'OK' : 'CANCEL',
    };

  } else if (status === 'IN_PROGRESS') {

    offerValue !== '' && changeOfferState(offerId, 'CONTRACTED');

    const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
      offerValue: finalValue,
      dateOffered: Date.now(),
      status: 'CONTRACTED',
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

  finalValue !== '' && addHistoryOffer(offerId, offerDriverId, newOfferValue);

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
    driverId: '',
    offerValue: '',
    dateOffered: '',
    status: 'ACTIVE',
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