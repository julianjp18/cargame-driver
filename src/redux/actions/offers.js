import { firestoreDB } from '../../constants/Firebase';
export const SHOW_ACTIVE_OFFERS = 'SHOW_ACTIVE_OFFERS';

export const showActiveOffers = () => dispatch => {

    const data = firestoreDB
    .collection("OffersNotificationCenter")
    .get();

    dispatch({
        type: SHOW_ACTIVE_OFFERS,
        offers: data
    });
};