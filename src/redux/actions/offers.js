import { firestoreDB } from '../../constants/Firebase';
export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';

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