import { firestoreDB } from '../../constants/Firebase';

export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';
export const REALIZE_OFFER = 'REALIZE_OFFER';

export const showActiveOffers = () => dispatch => {
  const data = firestoreDB
  .collection("OffersNotificationCenter");

  const offersData = [];
  data.onSnapshot((allOffers) => {
      allOffers.forEach(offer => {
          if (offer.data().status === "active") {
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

export const realizeOffer = (offerId, newOfferValue, userId, index) => async dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();
  const { offerValue } = await data.then(doc => doc.data());

  let finalValue = offerValue !== ''
    ? offerValue
    : newOfferValue;

  finalValue = parseInt(finalValue) > parseInt(newOfferValue)
    ? newOfferValue
    : finalValue; 

  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    driverId: userId,
    offerValue: finalValue,
  });

  const responseUpdateData = updateData.then(() => true).catch(() => false);

  const response = {
    message: responseUpdateData
      ? 'Usted ha ofertado satisfactoriamente por'
      : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
    status: responseUpdateData ? 'OK' : 'CANCEL',
  };

  dispatch({
    type: REALIZE_OFFER,
    offerId,
    offerValue: finalValue,
    index,
    response,
  });
};