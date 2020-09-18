import { firestoreDB } from '../../constants/Firebase';

export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';
export const REALIZE_OFFER = 'REALIZE_OFFER';

export const showActiveOffers = () => dispatch => {
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

  dispatch({
      type: SHOW_ACTIVE_OFFERS,
      offers: offersData
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
    pickupDate
  } = await dataOffer.then(doc => doc.data());

  return {
    currentAddress,
    currentCity,
    description,
    destinationAddress,
    destinationCity,
    pickupDate
  }
};

const changeOfferState = async (offerId) => {
  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    status: 'IN_PROGRESS',
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
    const getOfferData = getOfferById(offerId);
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
    
    return true;
  }
};

export const realizeOffer = (offerId, newOfferValue, offerDriverId, index) => async dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();
  const { offerValue, status, driverId } = await data.then(doc => doc.data());

  let response = '';
  let finalValue = offerValue !== ''
      ? offerValue
      : newOfferValue;

  if (status === 'ACTIVE') {

    offerValue !== '' && changeOfferState(offerId);

    finalValue = parseInt(finalValue) > parseInt(newOfferValue)
      ? newOfferValue
      : finalValue; 

    const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
      driverId: offerDriverId,
      offerValue: finalValue,
      dateOffered: Date.now(),
    });

    const responseUpdateData = updateData.then(() => true).catch(() => false);

    response = {
      message: responseUpdateData
        ? 'Usted ha ofertado satisfactoriamente por'
        : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
      status: responseUpdateData ? 'OK' : 'CANCEL',
    };

  } else if (status === 'IN_PROGRESS') {

    if (driverId === offerDriverId) {
      response = {
        message: 'Se le ha asignado la oferta',
        status: 'OK',
      };
    } else {
      response = {
        message: 'Se le ha asignado la oferta a alguien más',
        status: 'REJECTED',
      };
    }
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