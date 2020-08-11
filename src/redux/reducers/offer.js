import { SHOW_ACTIVE_OFFERS, REALIZE_OFFER } from "../actions/offers";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ACTIVE_OFFERS:
      return {
        offers: action.offers,
      };
    case REALIZE_OFFER:
      const newOffers = [];
      state.offers.forEach(offer => {
        if(offer.offerId === action.offerId) {
          newOffers.push({...offer, offerValue: action.offerValue});
        } else {
          newOffers.push(offer);
        }
      });
      return {
        offers: newOffers,
      };
    default:
      return state;
  }
};