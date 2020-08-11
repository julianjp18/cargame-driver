import { firestoreDB } from '../../constants/Firebase';

export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';
export const REALIZE_OFFER = 'REALIZE_OFFER';

export const showActiveOffers = () => dispatch => {
  const data = firestoreDB
  .collection("OffersNotificationCenter")
  .get();

  const offersData = [];
  data.then((allOffers) => {
      allOffers.forEach(offer => {
          if (offer.data().status === "active") {
              offersData.push({...offer.data(), offerId: offer.id });
          }
      });
  });

  dispatch({
      type: SHOW_ACTIVE_OFFERS,
      offers: offersData
  });
};

export const realizeOffer = (offerId, newOfferValue, userId) => async dispatch => {
  const data = firestoreDB
    .collection('OffersNotificationCenter')
    .doc(offerId)
    .get();
  const { offerValue } = await data.then(doc => doc.data());

  let finalValue = offerValue ? offerValue : newOfferValue;

  finalValue = parseInt(finalValue) > parseInt(newOfferValue)
    ? newOfferValue
    : finalValue; 

  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    driverId: userId,
    offerValue: finalValue,
  });

  const responseUpdateData = updateData.then(() => true).catch(() => false);

  dispatch({
    type: REALIZE_OFFER,
    offerId,
    offerValue: finalValue,
  });

  return {
    response: {
      text: responseUpdateData
        ? '¡Usted acaba de ofertar satisfactoriamente!'
        : 'No se pudo actualizar la oferta, por favor inténtelo nuevamente',
      status: responseUpdateData ? 'OK' : 'CANCEL',
    },
  };
};